import { directus } from "@/lib/directus";
import type { Event } from "@/types";

export function getEvents(): Promise<Event[]> {
  return directus.items('events').readByQuery({limit: -1, sort: ['-start_date'], fields: ['*', 'image.*']})
    .then(r => (r.data as Event[] | null | undefined) ?? [])
}