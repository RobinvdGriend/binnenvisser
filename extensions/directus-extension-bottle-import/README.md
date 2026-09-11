# Bottle Import (Directus extension)

Monthly manual import of the bottle workbook (`.xlsx`) into Directus.

- **Module** (`Bottle Import` in the sidebar): the client uploads the workbook, maps
  each `bottle_lists` entry to a worksheet tab, previews the changes, then confirms.
- **Endpoint** (`POST /bottle-import/sync`, admin-only): syncs the mapped tabs.

## What it does

For every list the client maps to a tab, the sheet is parsed and, **scoped to that
list**, the bottles are:

- matched to existing rows by `name + maker + year` (case-insensitive),
- **created** if new, **updated** if matched (categories are found-or-created in
  `bottle_categories`),
- **hard-deleted** if they exist in that list but are no longer in the tab.

Lists left unmapped are untouched. Nothing is written until the client clicks
**Confirm & import** — the preview step runs a dry run.

## ⚠️ Verify before first real import

Two things depend on the actual workbook and must be checked in
[`src/module/module.vue`](src/module/module.vue) (top of the file):

1. **`COLUMN`** — the zero-based column index of each bottle field
   (`name`, `year`, `maker`/brand, `type`, `location`/locale). The tabs have no
   header row, so these are positional.
2. **`TYPE_TARGET_FIELD`** — which bottle field the sheet "type" column feeds
   (default `info`; set to `null` to ignore it).

Category rows are detected as "only the first column is filled". If a real bottle row
can ever have just one filled cell, it would be misread as a category.

Always use the **Preview** step and sanity-check the delete count on the first run.

## Build

```bash
cd extensions/directus-extension-bottle-import
npm install
npm run build      # writes dist/app.js + dist/api.js
```

`xlsx` is bundled into `dist/`, so no `node_modules` is needed at runtime.

## Deploy

The production deploy (`deploy.sh`) only does `git pull` + `docker compose up` — it does
**not** build extensions. So the built `dist/` is committed to git (see the `.gitignore`
negation), and `docker-compose.yml` mounts `./extensions` into the container.

1. Build (above) and commit the source **and** `dist/`.
2. `./deploy.sh`

## Enable the module

After deploy, in Directus: **Settings → Project Settings → Modules** → enable
**Bottle Import**. It then appears in the left sidebar for admins.
