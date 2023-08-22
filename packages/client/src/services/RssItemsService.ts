import $api from '../http'
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

import { post } from '../types'

export default class RssItemsService {
  static async updateItem(data: post): Promise<AxiosResponse<AuthResponse>> {
    const { title, link, pubDate, _id }  = data
    return $api.put(`/rss-items/${_id}`, { title, link, pubDate, _id })
  }

  static async deleteItem(id: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.delete(`/rss-items/${id}`)
  }
}
