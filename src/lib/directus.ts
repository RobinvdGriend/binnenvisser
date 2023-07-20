import { Directus } from '@directus/sdk'
import { CMS_URL } from '@/config'
import type { Home, FlatPage, Event, Grape, WineMaker, Info, MenuItem, MenuCategory } from '@/types'

type Collections = {
  home: Home
  flat_pages: FlatPage
  events: Event
  wine_makers: WineMaker
  grapes: Grape
  info: Info
  menu_items: MenuItem
  menu_category: MenuCategory
}

export const directus = new Directus<Collections>(CMS_URL)
