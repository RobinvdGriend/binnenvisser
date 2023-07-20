import { directus } from "@/lib/directus";
import { useSwrv } from "@/lib/swrv"
import type { Event } from "@/types";

export async function getEvents(): Promise<Event[]> {
  return directus.items('events').readByQuery({limit: -1, sort: ['-start_date'], fields: ['*', 'image.*']})
    .then(r => (r.data as Event[] | null | undefined) ?? [])
}

export function useEvents() {
  return useSwrv<Event[]>('/events', getEvents)
}