import { Directus } from '@directus/sdk'
import { CMS_URL } from '@/config'
import type { Home, FlatPage, Event } from '@/types'

type Collections = {
  home: Home,
  flat_pages: FlatPage,
  events: Event,
}

export const directus = new Directus<Collections>(CMS_URL)
