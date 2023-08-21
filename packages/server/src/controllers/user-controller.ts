import { Request, Response, NextFunction } from 'express'
import userService from '../service/user-service'

import { CreateUserInput } from '../schemas/user.schema'

class UserController {

  async registration(
    req: Request<object, object, CreateUserInput['body']>,
    res: Response,
    next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await userService.registration({ email, password })
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 2*60*60*1000, httpOnly: true })
      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  async login(
    req: Request<object, object, CreateUserInput['body']>,
    res: Response,
    next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await userService.login({ email, password })
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 2*60*60*1000, httpOnly: true })
      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (err) {
      next(err)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 2*60*60*1000, httpOnly: true })
      return res.json(userData)
    } catch (err) {
      next(err)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (err) {
      next(err)
    }
  }

}

export default new UserController()
