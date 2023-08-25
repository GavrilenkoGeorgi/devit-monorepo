import RssItemModel from '../models/rss-item-model'
import { paginate } from '../utils'

type itemUpdProps = {
  id: string,
  title: string,
  link: string,
  pubDate: string
}

class RssService {

  async getItems(order: number, limit: number, page: number, value: string) {

    let docs

    if (!order && !value) {
      docs = await RssItemModel.find()
    }

    if (value) {
      docs = await RssItemModel.find({ title: { $regex: value, $options: 'i' } })
    }

    if (order === 1) { // this one is really strange, need to sort this out
      docs = await RssItemModel.find().sort({ title: 'asc' })
    } else if (order === -1) {
      docs = await RssItemModel.find().sort({ title: 'desc' })
    }

    return paginate(docs as [], page, limit)
  }

  async createItem(title: string, link: string, pubDate: string) { // !
    const item = await RssItemModel.create({ title, link, pubDate })
    return item
  }

  async getItem(id: string) {
    const item = await RssItemModel.findById(id)
    return item
  }

  async updateItem({ id, title, link, pubDate }: itemUpdProps) {
    const item = await RssItemModel.findByIdAndUpdate(id, { id, title, link, pubDate })
    return item
  }

  async deleteItem(id: string) {
    const tokenData = await RssItemModel.findByIdAndDelete(id)
    return tokenData
  }
}

export default new RssService()
