import { Schema, model }  from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

export const RssItemSchema = new Schema({
  title: String,
  link: String,
  pubDate: String
})

RssItemSchema.plugin(mongoosePaginate)

export default model('RssItem', RssItemSchema)
