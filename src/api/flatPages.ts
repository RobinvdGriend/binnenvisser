
import type { FlatPage } from '@/types'
import { directus } from '@/lib/directus'
import { useSwrv } from '@/lib/swrv'
import type { Ref } from 'vue'

export async function getFlatPage(slug: string): Promise<FlatPage> {
  const results = await directus
    .items('flat_pages')
    .readByQuery({ filter: { slug: { _eq: slug } } })

  if (!results.data || !results.data[0]) {
    throw new Error('Page not found')
  }

  return results.data[0]
}

export function useFlatPage(slug: Ref<string | null>) {
  // Type assertion is correct because useSWRV will only call the fetcher
  // when the cache key function is `truthy`
  return useSwrv<FlatPage>(
    () => 'flat_pages/' + slug.value,
    () => getFlatPage(slug.value as string)
  )
}
