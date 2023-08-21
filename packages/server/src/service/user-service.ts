import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'

import tokenService from './token-service'
import { UserDto } from '../dtos/user-dto'
import { credProps } from '../types'

class UserService {

  async registration({ email, password }: credProps) {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      throw new Error('User already exists.')
    }

    const hashPassword = await bcrypt.hash(password, 7)
    const activationLink = uuid.v4()
    const user = await UserModel.create({ email, password: hashPassword, activationLink })

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async login({ email, password }: credProps) {
    const user = await UserModel.findOne({ email }) as credProps

    if (!user) {
      throw new Error('User not found.')
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      throw new Error('Password is incorrrect.')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('Invalid refresh token.')
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw new Error('Unauthorised.')
    }

    const user = await UserModel.findById(tokenFromDb.user?.toString())
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async getAllUsers() {
    const users = await UserModel.find()
    return users
  }
}

export default new UserService()
