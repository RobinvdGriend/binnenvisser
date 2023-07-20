import { directus } from '@/lib/directus'
import { useSwrv } from '@/lib/swrv'
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

export function useWineMakers() {
  return useSwrv<WineMaker[]>('/wine_makers', getWineMakers)
}
