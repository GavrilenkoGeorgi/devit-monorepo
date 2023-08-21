/* eslint-disable */
import { Router } from 'express'
import UserController from '../controllers/user-controller'

import { createUserSchema } from '../schemas/user.schema'
import validateResource from '../schemas/validateResource'

export const router = Router()

router.post('/registration', validateResource(createUserSchema), UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/users', UserController.getUsers)
