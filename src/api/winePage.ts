import { useSwrv } from '@/lib/swrv'
import type { WinePageDescription } from '@/types'
import { directus } from '@/lib/directus'

export async function getWinePageDescription(): Promise<WinePageDescription> {
  return await directus
    .singleton('wine_page_description')
    .read()
    .then((result) => {
      return result ? result : { description: '' }
    })
}

export function useWinePageDescription() {
  return useSwrv<WinePageDescription>('/wine-page-description', getWinePageDescription)
}