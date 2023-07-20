import { useSwrv } from '@/lib/swrv'
import type { Home } from '@/types'
import { directus } from '@/lib/directus'

export async function getHome(): Promise<Home> {
  return await directus
    .singleton('home')
    .read()
    .then((home) => {
      return home ? home : { content: '' }
    })
}

export function useHome() {
  return useSwrv<Home>('home', getHome)
}
