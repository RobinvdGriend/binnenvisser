import { useSwrv } from '@/lib/swrv'
import { directus } from '@/lib/directus'
import type { Bottle, BottleList} from '@/types'

export async function getBottles(): Promise<Bottle[]> {
  // @ts-expect-error
  return directus
    .items('bottles')
    .readByQuery({ limit: -1, sort: ['category', 'location','maker'], fields: ['*', 'category.*']})
    .then((r) => r.data ?? [])
}

export function useBottles() {
  return useSwrv<Bottle[]>('/bottles', getBottles)
}

export function getBottleLists(): Promise<BottleList[]> {
  return directus.items('bottle_lists').readByQuery({ limit: -1, sort: ['order'] }).then((r) => r.data ?? []) 
}

export function useBottleLists() {
  return useSwrv<BottleList[]>('/bottle_lists', getBottleLists)
}