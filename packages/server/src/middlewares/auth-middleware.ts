import { Response, NextFunction } from 'express'
import tokenService from '../service/token-service'
import { ICustomRequest } from '../types' // ?

const authMiddleware = (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorisationHeader = req.headers.authorization

    if (!authorisationHeader) {
      return next(new Error('Unauthorised.'))
    }

    const [ , accessToken ] = authorisationHeader.split(' ')

    if (!accessToken) {
      return next(new Error('Unauthorised.'))
    }

    const userData = tokenService.validateAccessToken(accessToken)

    if (!userData) {
      res.status(401).send('Access token expired.')
    }

    next()

  } catch (err) {
    return next(err)
  }
}

export default authMiddleware
