import { directus } from "@/lib/directus";
import type { MenuItem } from "@/types";

export async function getMenuItems(): Promise<MenuItem[]> {
  return directus.items('menu_items').readByQuery({
    limit: -1,
    sort: ['sort'],
  }).then(r => r.data ?? [])
}