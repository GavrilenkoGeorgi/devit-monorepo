import { Schema, model } from 'mongoose'

export const RssItemSchema = new Schema({
  title: String,
  link: String,
  pubDate: Date
})

export default model('RssItem', RssItemSchema)
