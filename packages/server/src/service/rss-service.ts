import RssItemModel from '../models/rss-item-model'

type itemUpdProps = {
  id: string,
  title: string,
  link: string,
  pubDate: string
}

class RssService {

  async searchItems(value: string) { // need to paginate this results too
    // const items = await RssItemModel.find({ $text: { $search: value} })
    const items = await RssItemModel.find({ title: { $regex: value, $options: 'i' } })
    return items
  }

  async createItem(title: string, link: string, pubDate: string) { // !
    const item = await RssItemModel.create({ title, link, pubDate })
    return item
  }

  async getAllItems(order: number, limit: number, page: number) {
    let items
    if (order) {
      items = await RssItemModel.paginate({}, { limit, page, sort: { title: order } })
    } else {
      items = await RssItemModel.paginate({}, { limit, page })
    }
    return items
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
