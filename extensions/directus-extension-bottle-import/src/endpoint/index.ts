import { defineEndpoint } from '@directus/extensions-sdk';

/**
 * POST /bottle-import/sync
 *
 * Body: {
 *   dryRun: boolean,
 *   typeField: string | null,          // which bottle field the sheet "type" column feeds
 *   lists: [{ listId, bottles: [{ name, year, maker, location, category, [typeField] }] }]
 * }
 *
 * For each mapped list it upserts the incoming bottles (matched by name+maker+year,
 * scoped to that list) and HARD DELETES existing bottles in that list that are not in
 * the sheet. Categories are found-or-created in `bottle_categories`. With dryRun=true
 * it computes the same diff but performs no writes.
 */

type ParsedBottle = {
	name?: string;
	year?: string;
	maker?: string;
	location?: string;
	category?: string;
	[key: string]: unknown;
};

type ListPayload = { listId: string | number; bottles: ParsedBottle[] };

const norm = (value: unknown): string => String(value ?? '').trim().toLowerCase();

// Natural key used to match a sheet row to an existing DB row, within one list.
const keyOf = (b: { name?: unknown; maker?: unknown; year?: unknown }): string =>
	`${norm(b.name)}|${norm(b.maker)}|${norm(b.year)}`;

export default defineEndpoint((router, { services, getSchema }) => {
	const { ItemsService } = services;

	router.post('/sync', async (req: any, res: any) => {
		if (!req.accountability?.admin) {
			return res.status(403).json({ errors: [{ message: 'Bottle import is admin-only.' }] });
		}

		const dryRun: boolean = req.body?.dryRun !== false; // default to a safe dry run
		const typeField: string | null = req.body?.typeField ?? null;
		const lists: ListPayload[] = Array.isArray(req.body?.lists) ? req.body.lists : [];

		if (lists.length === 0) {
			return res.status(400).json({ errors: [{ message: 'No lists were mapped to a tab.' }] });
		}

		try {
			const schema = await getSchema();
			const opts = { schema, accountability: req.accountability };
			const bottlesSvc = new ItemsService('bottles', opts);
			const categoriesSvc = new ItemsService('bottle_categories', opts);

			// 1. Resolve categories (find-or-create; only write on a real run).
			const wantedCategories = new Set<string>();
			for (const l of lists) {
				for (const b of l.bottles ?? []) {
					if (b.category && String(b.category).trim()) wantedCategories.add(String(b.category).trim());
				}
			}

			const existingCats: any[] = await categoriesSvc.readByQuery({
				limit: -1,
				fields: ['id', 'name'],
			});
			const catIdByName = new Map<string, unknown>();
			for (const c of existingCats) catIdByName.set(norm(c.name), c.id);

			if (!dryRun) {
				for (const name of wantedCategories) {
					if (!catIdByName.has(norm(name))) {
						const id = await categoriesSvc.createOne({ name });
						catIdByName.set(norm(name), id);
					}
				}
			}

			// 2. Diff + apply per list.
			const summary: Array<{ listId: string | number; created: number; updated: number; deleted: number }> = [];

			for (const l of lists) {
				const listId = l.listId;
				const incoming: ParsedBottle[] = l.bottles ?? [];

				const existing: any[] = await bottlesSvc.readByQuery({
					filter: { list: { _eq: listId } },
					limit: -1,
					fields: ['id', 'name', 'maker', 'year'],
				});

				const existingByKey = new Map<string, any>();
				for (const e of existing) existingByKey.set(keyOf(e), e);

				// De-dupe incoming by key (last row wins) so we never create duplicates.
				const incomingByKey = new Map<string, ParsedBottle>();
				for (const b of incoming) {
					if (!b.name || !String(b.name).trim()) continue;
					incomingByKey.set(keyOf(b), b);
				}

				const toCreate: Record<string, unknown>[] = [];
				const toUpdate: Array<{ id: unknown; data: Record<string, unknown> }> = [];

				for (const [key, b] of incomingByKey) {
					const fields: Record<string, unknown> = {
						name: b.name,
						year: b.year || null,
						maker: b.maker || null,
						location: b.location || null,
						list: listId,
						category: b.category ? catIdByName.get(norm(b.category)) ?? null : null,
					};
					if (typeField) fields[typeField] = b[typeField] ?? null;

					const match = existingByKey.get(key);
					if (match) toUpdate.push({ id: match.id, data: fields });
					else toCreate.push(fields);
				}

				const toDelete: unknown[] = [];
				for (const [key, e] of existingByKey) {
					if (!incomingByKey.has(key)) toDelete.push(e.id);
				}

				if (!dryRun) {
					for (const data of toCreate) await bottlesSvc.createOne(data);
					for (const u of toUpdate) await bottlesSvc.updateOne(u.id, u.data);
					if (toDelete.length) await bottlesSvc.deleteMany(toDelete);
				}

				summary.push({
					listId,
					created: toCreate.length,
					updated: toUpdate.length,
					deleted: toDelete.length,
				});
			}

			return res.json({ dryRun, lists: summary });
		} catch (error: any) {
			return res
				.status(500)
				.json({ errors: [{ message: error?.message ?? 'Bottle import failed.' }] });
		}
	});
});
