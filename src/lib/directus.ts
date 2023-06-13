import { Directus } from '@directus/sdk'
import { CMS_URL } from '@/config'

export const directus = new Directus(CMS_URL)
