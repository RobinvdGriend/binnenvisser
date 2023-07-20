import type { InstagramFeedItem } from "@/types"

const BEHOLD_FEED_URL = 'https://calistoamsterdam.nl/behold/oAxCwcIgZKfQ69QYLpkK'

export async function getInstagramFeed(): Promise<InstagramFeedItem[]> {
  const rawFeed: Array<any> = await fetch(BEHOLD_FEED_URL).then(r => r.json())

  return rawFeed.map((item) => ({
    id: item.id,
    mediaUrl: item.mediaUrl,
    dominantColor: item.colorPalette.dominant,
  }))
}