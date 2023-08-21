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
      return next(new Error('User not found.'))
    }

    // req.user = userData // ???
    next()

  } catch (err) {
    return next(err)
  }
}

export default authMiddleware