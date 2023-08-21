import { Request, Response, NextFunction } from 'express'
import RssParser from 'rss-parser'
import cron from 'node-cron'
import RssItemModel from '../models/rss-item-model'
import rssService from '../service/rss-service'

class RssController {

  async scheduleFetch() {
    cron.schedule('* 1 * * * *', () => {
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

  async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await rssService.getAllItems()
      return res.json(items)
    } catch (err) {
      next(err)
    }
  }

  async newItem(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('new item')
      return res.status(200).end()
    } catch (err) {
      next(err)
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).end()
    } catch (err) {
      next(err)
    }
  }

  async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('delete item')
      return res.status(200).end() // status code!
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
