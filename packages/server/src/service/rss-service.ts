import RssItemModel from '../models/rss-item-model'

class RssService {

  async getAllItems(limit: number, page: number) {
    const items = await RssItemModel.paginate({}, { limit, page })
    return items
  }

  async getItem(id: string) {
    const item = await RssItemModel.findById(id)
    return item
  }
}

export default new RssService()
