import { Request } from 'express'

import { JwtPayload } from 'jsonwebtoken'

export type tokenPayload = {
  email: string,
  id: string,
  isActivated: string
}

export type credProps = {
  email: string,
  password: string
}

export interface ICustomRequest extends Request {
    user?: string | JwtPayload
}
