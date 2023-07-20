import useSwrvLib from 'swrv'
import type { IConfig, IKey, fetcherFn } from 'swrv/dist/types'

const config: IConfig = {
  revalidateOnFocus: false,
  revalidateDebounce: 5000,
}

export function useSwrv<T>(key: IKey, fetcher: fetcherFn<T>) {
  return useSwrvLib(key, fetcher, config)
}