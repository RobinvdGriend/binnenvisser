export type FlatPageSummary = {
  id: string
  name: string
  slug: string
}

export type FlatPage = FlatPageSummary & {
  content: string
}

export type Home = {
  content: string
}

export type Image = {
  id: string,
  title?: string
  description?: string
}

export type Event = {
  id: string
  name: string
  start_date: string
  end_date?: string
  start_time: string
  end_time?: string
  image: Image
}

export type Grape = {
  id: string
  name: string
  country: string
}

export type MenuItem = {
  id: string
  sort: number
  name: string
  price: string
  category: MenuCategory
}

export type MenuCategory = {
  id: string
  sort: string
  name: string
  hide_category_name: boolean
  menu_items: MenuItem[]
}

export type WineMaker = {
  id: string
  name: string
}

export type InstagramFeedItem = {
  id: string
  mediaUrl: string
  dominantColor: string
  permalink: string
}

export type Info = {
  content: string
}
