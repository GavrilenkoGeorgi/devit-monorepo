import { Request, Response, NextFunction } from 'express'
import RssParser from 'rss-parser'
import cron from 'node-cron'
import RssItemModel from '../models/rss-item-model'
import rssService from '../service/rss-service'

class RssController {

  async scheduleFetch() {
    cron.schedule('*/15 * * * *', () => {
      console.log('Scheduled fetch.')
      this.fetchRssFeed()
    })
  }

  async fetchRssFeed() {
    console.log('Fetching feed.')
    const parser = new RssParser()
    const feed = await parser.parseURL('https://www.reddit.com/.rss')

    feed.items.forEach(async item => {
      const existing = await RssItemModel.findOne({ link: item.link })
      if (!existing) {
        const newItem = new RssItemModel({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate
        })
        newItem.save()
      }
    })
  }

  async searchItems(req: Request, res: Response, next: NextFunction) {
    try {
      const value = req.query.value?.toString() || ''
      const items = await rssService.searchItems(value)
      return res.json(items)
    } catch (err) {
      next(err)
    }
  }

  async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 10
      const page = parseInt(req.query.page as string) || 1
      const order = parseInt(req.query.order as string) || 0

      const items = await rssService.getAllItems(order, limit, page)
      return res.json(items)
    } catch (err) {
      next(err)
    }
  }

  async newItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, link, pubDate } = req.body
      const itemData = await rssService.createItem(title, link, pubDate)
      return res.json(itemData)
    } catch (err) {
      next(err)
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, link, pubDate } = req.body
      const id = req.params.id

      const updatedItem = await rssService.updateItem({ id, title, link, pubDate })
      return res.json(updatedItem)
    } catch (err) {
      next(err)
    }
  }

  async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const result = await rssService.deleteItem(id)
      return res.json(result)
    } catch (err) {
      next(err)
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await rssService.getItem(req.params.id)
      return res.json(item)
    } catch (err) {
      next(err)
    }
  }
}

export default new RssController()
