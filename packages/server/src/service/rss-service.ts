import RssItemModel from '../models/rss-item-model'

class RssService {

  async getAllItems() {
    const items = await RssItemModel.find()
    return items
  }
}

export default new RssService()
