import RssItemModel from '../models/rss-item-model'

class RssService {

  async getAllItems() {
    const items = await RssItemModel.find()
    return items
  }

  async getItem(id: string) {
    const item = await RssItemModel.findById(id)
    return item
  }
}

export default new RssService()
