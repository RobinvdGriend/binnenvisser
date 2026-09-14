<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useApi } from '@directus/extensions-sdk';
import * as XLSX from 'xlsx';

/* =======================================================================
 * SHEET LAYOUT — adjust these to match the actual workbook.
 * The tabs have no header row: each row is either a category delimiter
 * (only the first column filled) or a bottle row. COLUMN maps the
 * zero-based column index of each bottle field.
 * ===================================================================== */
const COLUMN = {
	name: 0,
	year: 1,
	maker: 2, // "brand" column
	type: 3,
	location: 4, // "locale" column
};
// Which Directus bottle field the sheet "type" column feeds. null = ignore it.
const TYPE_TARGET_FIELD: string | null = 'info';
/* ===================================================================== */

type ListRef = { id: string | number; name: string };
type ParsedBottle = {
	name: string;
	year: string;
	maker: string;
	location: string;
	category: string;
	[key: string]: string;
};
type ListResult = { listId: string | number; created: number; updated: number; deleted: number };
type CategoryNode = { name: string; count: number };

const api = useApi();

const lists = ref<ListRef[]>([]);
const workbook = ref<XLSX.WorkBook | null>(null);
const sheetNames = ref<string[]>([]);
const fileName = ref('');
// mapping[listId] = worksheet name (or null to skip this list)
const mapping = reactive<Record<string, string | null>>({});
const result = ref<{ dryRun: boolean; lists: ListResult[] } | null>(null);
const loading = ref(false);
const error = ref('');

const tabOptions = computed(() => sheetNames.value.map((n) => ({ text: n, value: n })));
const hasMapping = computed(() => Object.values(mapping).some((v) => !!v));

// Detected categories (with wine counts) per mapped list, for the preview tree.
const analyses = computed<Record<string, CategoryNode[]>>(() => {
	const out: Record<string, CategoryNode[]> = {};
	if (!workbook.value) return out;
	for (const [listId, sheet] of Object.entries(mapping)) {
		if (sheet) out[listId] = analyzeSheet(sheet).tree;
	}
	return out;
});
const isPreview = computed(() => result.value?.dryRun === true);
const isDone = computed(() => result.value?.dryRun === false);
const totalDeletes = computed(() =>
	(result.value?.lists ?? []).reduce((sum, r) => sum + r.deleted, 0)
);

onMounted(async () => {
	try {
		const res = await api.get('/items/bottle_lists', {
			params: { limit: -1, fields: ['id', 'name'], sort: ['name'] },
		});
		lists.value = res.data.data;
	} catch (e: any) {
		error.value = e?.message ?? 'Could not load bottle lists.';
	}
});

function listName(id: string | number): string {
	return String(lists.value.find((l) => String(l.id) === String(id))?.name ?? id);
}

function resetSheet() {
	workbook.value = null;
	sheetNames.value = [];
	fileName.value = '';
	Object.keys(mapping).forEach((k) => delete mapping[k]);
	result.value = null;
	error.value = '';
}

async function onFile(event: Event) {
	resetSheet();
	const file = (event.target as HTMLInputElement).files?.[0];
	if (!file) return;
	fileName.value = file.name;
	try {
		const buffer = await file.arrayBuffer();
		workbook.value = XLSX.read(buffer, { type: 'array' });
		sheetNames.value = workbook.value.SheetNames;
	} catch (e: any) {
		error.value = e?.message ?? 'Could not read the workbook.';
	}
}

function analyzeSheet(sheetName: string): { bottles: ParsedBottle[]; tree: CategoryNode[] } {
	const ws = workbook.value!.Sheets[sheetName];
	const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1, blankrows: false, defval: '' });
	const bottles: ParsedBottle[] = [];
	const tree: CategoryNode[] = [];
	let category = '';
	let node: CategoryNode | null = null;

	for (const row of rows) {
		const cells = (row as any[]).map((c) => String(c ?? '').trim());
		const nonEmpty = cells.filter((c) => c !== '');
		if (nonEmpty.length === 0) continue;

		// Category delimiter: only the first column is populated.
		if (nonEmpty.length === 1 && cells[0] !== '') {
			category = cells[0];
			node = { name: category, count: 0 };
			tree.push(node);
			continue;
		}

		const name = cells[COLUMN.name] ?? '';
		if (!name) continue;

		if (!node) {
			node = { name: '(no category)', count: 0 };
			tree.push(node);
		}

		const bottle: ParsedBottle = {
			name,
			year: cells[COLUMN.year] ?? '',
			maker: cells[COLUMN.maker] ?? '',
			location: cells[COLUMN.location] ?? '',
			category,
		};
		if (TYPE_TARGET_FIELD) bottle[TYPE_TARGET_FIELD] = cells[COLUMN.type] ?? '';
		bottles.push(bottle);
		node.count++;
	}

	return { bottles, tree };
}

function buildPayload(dryRun: boolean) {
	const mappedLists = Object.entries(mapping)
		.filter(([, sheet]) => !!sheet)
		.map(([listId, sheet]) => ({ listId, bottles: analyzeSheet(sheet as string).bottles }));
	return { dryRun, typeField: TYPE_TARGET_FIELD, lists: mappedLists };
}

async function run(dryRun: boolean) {
	loading.value = true;
	error.value = '';
	try {
		const res = await api.post('/bottle-import/sync', buildPayload(dryRun));
		result.value = res.data;
	} catch (e: any) {
		error.value = e?.response?.data?.errors?.[0]?.message ?? e?.message ?? 'Import failed.';
	} finally {
		loading.value = false;
	}
}

const preview = () => run(true);
const commit = () => run(false);
</script>

<template>
	<private-view title="Bottle Import">
		<div class="bottle-import">
			<!-- Step 1: file -->
			<div class="block">
				<p class="type-label">1 · Workbook (.xlsx)</p>
				<input type="file" accept=".xlsx,.xls" @change="onFile" />
				<span v-if="fileName" class="muted">{{ fileName }} — {{ sheetNames.length }} tab(s)</span>
			</div>

			<!-- Step 2: map each list to a tab -->
			<div v-if="sheetNames.length" class="block">
				<p class="type-label">2 · Map each list to a tab</p>
				<p class="muted">Leave a list unset to skip it — nothing in that list will change.</p>
				<div v-for="list in lists" :key="list.id" class="map-block">
					<div class="map-row">
						<span class="map-name">{{ list.name }}</span>
						<v-select
							v-model="mapping[list.id]"
							:items="tabOptions"
							placeholder="— don't sync —"
							show-deselect
						/>
					</div>
					<ul v-if="mapping[list.id] && analyses[list.id]" class="tree">
						<li v-for="node in analyses[list.id]" :key="node.name" class="tree-cat">
							<span class="tree-name">{{ node.name }}</span>
							<span class="tree-count">{{ node.count }} wine{{ node.count === 1 ? '' : 's' }}</span>
						</li>
					</ul>
				</div>
				<div class="actions">
					<v-button :loading="loading" :disabled="!hasMapping" @click="preview">
						Preview changes
					</v-button>
				</div>
			</div>

			<!-- Step 3: review + confirm -->
			<div v-if="result" class="block">
				<p class="type-label">3 · Review</p>
				<table class="preview">
					<thead>
						<tr>
							<th>List</th>
							<th>Create</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="r in result.lists" :key="r.listId">
							<td>{{ listName(r.listId) }}</td>
							<td>{{ r.created }}</td>
							<td>{{ r.updated }}</td>
							<td :class="{ danger: r.deleted > 0 }">{{ r.deleted }}</td>
						</tr>
					</tbody>
				</table>

				<v-notice v-if="isPreview && totalDeletes > 0" type="warning">
					{{ totalDeletes }} bottle(s) will be permanently deleted. This cannot be undone.
				</v-notice>

				<div class="actions">
					<v-button v-if="isPreview" :loading="loading" kind="danger" @click="commit">
						Confirm &amp; import
					</v-button>
				</div>

				<v-notice v-if="isDone" type="success">Import complete.</v-notice>
			</div>

			<v-notice v-if="error" type="danger">{{ error }}</v-notice>
		</div>
	</private-view>
</template>

<style scoped>
.bottle-import {
	padding: 0 var(--content-padding) var(--content-padding);
	max-width: 800px;
}
.block {
	margin-bottom: 32px;
}
.type-label {
	margin-bottom: 8px;
}
.muted {
	display: block;
	color: var(--foreground-subdued);
	margin-bottom: 8px;
}
.map-row {
	display: flex;
	align-items: center;
	gap: 16px;
	margin-bottom: 8px;
}
.map-name {
	flex: 0 0 220px;
	font-weight: 600;
}
.map-block {
	margin-bottom: 16px;
}
.tree {
	list-style: none;
	margin: 8px 0 0 236px;
	padding: 8px 12px;
	background: var(--background-subdued);
	border-radius: var(--border-radius);
}
.tree-cat {
	padding: 2px 0;
}
.tree-name {
	font-weight: 600;
}
.tree-count {
	margin-left: 8px;
	color: var(--foreground-subdued);
	font-size: 12px;
}
.actions {
	margin-top: 16px;
}
.preview {
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 16px;
}
.preview th,
.preview td {
	text-align: left;
	padding: 8px 12px;
	border-bottom: 1px solid var(--border-subdued);
}
.preview td.danger {
	color: var(--danger);
	font-weight: 600;
}
</style>
