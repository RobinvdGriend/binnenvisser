export type FlatPageSummary = {
  name: string,
  slug: string,
}

export type FlatPage = FlatPageSummary & {
  content: string,
}

export type Home = {
  content: string,
}

export type Event = {
  schedule: string,
  info: string,
}