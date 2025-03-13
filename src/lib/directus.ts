import { Directus } from '@directus/sdk'
import { CMS_URL } from '@/config'
import type {
  Home,
  FlatPage,
  Event,
  Grape,
  WineMaker,
  Info,
  MenuItem,
  MenuCategory,
  Bottle,
  BottleCategory,
  BottleList,
  WinePageDescription
} from '@/types'

type Collections = {
  home: Home
  wine_page_description: WinePageDescription,
  flat_pages: FlatPage
  events: Event
  wine_makers: WineMaker
  grapes: Grape
  info: Info
  menu_items: MenuItem
  menu_category: MenuCategory
  bottles: Bottle
  bottle_categories: BottleCategory,
  bottle_lists: BottleList
}

export const directus = new Directus<Collections>(CMS_URL)
