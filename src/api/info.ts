import { directus } from "@/lib/directus";
import { useSwrv } from "@/lib/swrv";
import type { Info } from "@/types";

export async function getInfo(): Promise<Info | null> {
  return directus.singleton('info').read().then(r => r ?? null)
}

export function useInfo() {
  return useSwrv<Info | null>('/info', getInfo)
}