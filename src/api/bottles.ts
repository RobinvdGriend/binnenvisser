import { useSwrv } from '@/lib/swrv'
import { directus } from '@/lib/directus'
import type { Bottle } from '@/types'

export async function getBottles(): Promise<Bottle[]> {
  return directus
    .items('bottles')
    .readByQuery({ limit: -1, sort: ['category', 'location','maker'], fields: ['*', 'category.*']})
    .then((r) => r.data ?? [])
}

export function useBottles() {
  return useSwrv<Bottle[]>('/bottles', getBottles)
}