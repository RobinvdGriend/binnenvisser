import { directus } from '@/lib/directus'
import { useSwrv } from '@/lib/swrv'
import type { Event } from '@/types'
import type { Filter } from '@directus/sdk'

export interface GetEventsOptions {
  onlyIncludeUpcomingEvents?: boolean
}

export async function getEvents(options: GetEventsOptions): Promise<Event[]> {
  const { onlyIncludeUpcomingEvents = false } = options

  const filter: Filter<Event> = {}
  if (onlyIncludeUpcomingEvents) {
    filter['start_date'] = {
      _gt: '$NOW(-1 day)'
    }
  } 

  return directus
    .items('events')
    .readByQuery({ limit: -1, sort: ['-start_date'], fields: ['*', 'image.*'], filter: filter })
    .then((r) => (r.data as Event[] | null | undefined) ?? [])
}

export function useEvents(options: GetEventsOptions = {}) {
  let key = '/events'

  if (options.onlyIncludeUpcomingEvents) {
    key += '?onlyIncludeUpcomingEvents'
  }
  return useSwrv<Event[]>(key, () => getEvents(options))
}
