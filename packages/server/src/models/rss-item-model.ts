import { Schema, model }  from 'mongoose'

export const RssItemSchema = new Schema({
  title: String,
  link: String,
  pubDate: String
})

export default model('RssItem', RssItemSchema)
