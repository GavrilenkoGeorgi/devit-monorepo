import axios from 'axios'
import { makeAutoObservable } from 'mobx'

import AuthService from '../services/AuthService'
import { IUser } from '../models/IUser'
import { AuthResponse } from '../models/response/AuthResponse'
import { API_URL } from '../http'

export default class Store {
  user = {} as IUser
  isAuth = false
  msg = ''

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  setMessage(msg: string) {
    this.msg = msg
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
      return true
    } catch (err) {
      this.setMessage('Can\'t login, check creds.')
      return false
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (err) {
      console.error(err)
    }
  }

  async logout() {
    try {
      await AuthService.logout() // this looks strange
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (err) {
      console.error(err)
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })

      //---
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
      //---

    } catch (err) {
      console.error(err)
    }
  }
}
