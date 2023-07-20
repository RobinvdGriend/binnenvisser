import { directus } from '@/lib/directus'
import type { WineMaker } from '@/types'

export async function getWineMakers(): Promise<WineMaker[]> {
  return directus
    .items('wine_makers')
    .readByQuery({
      limit: -1,
      sort: ['name']
    })
    .then((r) => r.data ?? [])
}
