import { useSwrv } from '@/lib/swrv'
import { directus } from '@/lib/directus'
import type { Grape } from '@/types'

export async function getGrapes(): Promise<Grape[]> {
  return directus
    .items('grapes')
    .readByQuery({ limit: -1, sort: ['name'] })
    .then((r) => r.data ?? [])
}

export function useGrapes() {
  return useSwrv<Grape[]>('/grapes', getGrapes)
}