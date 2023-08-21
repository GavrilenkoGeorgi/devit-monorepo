import { Router } from 'express'
import UserController from '../controllers/user-controller'
import RssController from '../controllers/rss-controller'

import { createUserSchema } from '../schemas/user.schema'
import validateResource from '../schemas/validateResource'
import authMiddleware from '../middlewares/auth-middleware'

export const router = Router()

router.post('/registration', validateResource(createUserSchema), UserController.registration)
router.post('/login', validateResource(createUserSchema), UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)
router.get('/rss-items', authMiddleware, RssController.getRssItems)
