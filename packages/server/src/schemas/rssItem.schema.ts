import { object, string, TypeOf } from 'zod'

const rssItemSchema = {
  body: object({
    title: string({
      required_error: 'title is required',
    })
      .min(2, 'title too short')
      .max(256, 'title too long'),
    link: string({
      required_error: 'link is required',
    })
      .min(2, 'link too short')
      .max(256, 'link too long'),
    pubDate: string({
      required_error: 'pubDate is required',
    })
  })
}

export const createRssItemSchema  = object(rssItemSchema)
export type CreateUserInput = TypeOf<typeof createRssItemSchema>
