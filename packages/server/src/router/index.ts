import { Router } from 'express'
import UserController from '../controllers/user-controller'
import RssController from '../controllers/rss-controller'

import { createUserSchema } from '../schemas/user.schema'
import { createRssItemSchema } from '../schemas/rssItem.schema'
import validateResource from '../schemas/validateResource'
import authMiddleware from '../middlewares/auth-middleware'

export const router = Router()

router.post('/registration', validateResource(createUserSchema), UserController.registration)
router.post('/login', validateResource(createUserSchema), UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)
router.post('/rss-items', validateResource(createRssItemSchema), authMiddleware, RssController.newItem)
router.get('/rss-items', RssController.getItems)
router.get('/rss-items/:id', authMiddleware, RssController.getItem)
router.put('/rss-items/:id', validateResource(createRssItemSchema), authMiddleware, RssController.updateItem)
router.delete('/rss-items/:id', authMiddleware, RssController.deleteItem)
router.post('/rss-items/search', RssController.searchItems) // without auth for now
