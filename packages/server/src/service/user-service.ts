/* eslint-disable */
import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
// import uuid from 'uuid'

import * as uuid from 'uuid'

import mailService from './mail-service'
import tokenService from './token-service'
import { UserDto } from '../dtos/user-dto'
// import { tokenPayload } from '../types'

type regProps = {
  email: string,
  password: string
}

class UserService {
  async registration({ email, password }: regProps) {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      throw new Error('User already exists.')
    }

    const hashPassword = await bcrypt.hash(password, 7)
    const activationLink = uuid.v4()
    const user = await UserModel.create({ email, password: hashPassword, activationLink })
    await mailService.sendActivationEmail(email, activationLink)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }
}

export default new UserService()
