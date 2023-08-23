import RssItemModel from '../models/rss-item-model'

type itemUpdProps = {
  id: string,
  title: string,
  link: string,
  pubDate: string
}

class RssService {

  async createItem(title: string, link: string, pubDate: string) { // !
    const item = await RssItemModel.create({ title, link, pubDate })
    return item
  }

  async getAllItems(limit: number, page: number) {
    const items = await RssItemModel.paginate({}, { limit, page }) // react-query on frontend
    return items
  }

  async getItem(id: string) {
    const item = await RssItemModel.findById(id)
    return item
  }

  async updateItem({ id, title, link, pubDate }: itemUpdProps) {
    const item = await RssItemModel.findByIdAndUpdate(id, { id, title, link, pubDate })
    console.log('updated item', item)
    return item
  }
}

export default new RssService()
