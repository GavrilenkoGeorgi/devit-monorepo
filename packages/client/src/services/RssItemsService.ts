import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

import { post } from '../types'

export default class RssItemsService {
  static async createItem(data: post): Promise<AxiosResponse<AuthResponse>> {
    return $api.post('/rss-items', data)
  }

  static async getItems(page: number) {
    return $api.get(`/rss-items?page=${page}`)
  }

  static async updateItem(data: post): Promise<AxiosResponse<AuthResponse>> {
    const { title, link, pubDate, _id } = data
    return $api.put(`/rss-items/${_id}`, { title, link, pubDate, _id })
  }

  static async deleteItem(id: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.delete(`/rss-items/${id}`)
  }
}
