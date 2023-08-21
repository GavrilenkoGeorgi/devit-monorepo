import { Request, Response, NextFunction } from 'express'
import userService from '../service/user-service'

class UserController {

  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const userData = await userService.registration({ email, password })
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 2*60*60*1000, httpOnly: true })
      return res.json(userData)
    } catch (err: unknown) {
      res.status(409).send(err.message)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (err) {
      
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (err) {
      
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (err) {
      
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(['asad', 'sdsdf'])
    } catch (err) {

    }
  }

}

export default new UserController()
