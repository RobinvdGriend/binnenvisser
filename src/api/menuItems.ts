import { directus } from "@/lib/directus";
import { useSwrv } from "@/lib/swrv";
import type { MenuCategory } from "@/types";

export async function getMenuCategories(): Promise<MenuCategory[]> {
  return directus.items('menu_category').readByQuery({
    limit: -1,
    // @ts-ignore
    sort: ['menu_items.sort', 'sort'],
    fields: ['*', 'menu_items.*']
  }).then(r => (r.data as MenuCategory[] | null | undefined) ?? [])
}

export function useMenuCategories() {
  return useSwrv<MenuCategory[]>('/menu_categories', getMenuCategories)
}