import type { InstagramFeedItem } from "@/types"
import { BEHOLD_URL } from "@/config"


export async function getInstagramFeed(): Promise<InstagramFeedItem[]> {
  const rawFeed: Array<any> = await fetch(BEHOLD_URL).then(r => r.json())

  return rawFeed.map((item) => ({
    id: item.id,
    mediaUrl: item.mediaUrl,
    dominantColor: item.colorPalette.dominant,
    permalink: item.permalink,
  }))
}