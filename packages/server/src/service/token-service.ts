import jwt from 'jsonwebtoken'

import tokenModel from '../models/token-model'
import { tokenPayload } from '../types'

class TokenService {
  generateTokens(payload: tokenPayload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH || '', { expiresIn: '7d' })

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await tokenModel.create({ user: userId, refreshToken })
    return token

  }
}

export default new TokenService()
