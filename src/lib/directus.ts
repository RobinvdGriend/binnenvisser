import { Directus } from '@directus/sdk'
import { CMS_URL } from '@/config'
import type { Home, FlatPage, Event, Grape, WineMaker, ContactInformation, MenuItem } from '@/types'

type Collections = {
  home: Home
  flat_pages: FlatPage
  events: Event
  wine_makers: WineMaker
  grapes: Grape
  contact_information: ContactInformation
  menu_items: MenuItem
}

export const directus = new Directus<Collections>(CMS_URL)
