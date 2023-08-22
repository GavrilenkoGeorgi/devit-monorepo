import RssItemModel from '../models/rss-item-model'

type itemUpdProps = {
  id: string,
  title: string,
  link: string,
  pubDate: string
}

class RssService {

  async getAllItems(limit: number, page: number) {
    const items = await RssItemModel.paginate({}, { limit, page })
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
