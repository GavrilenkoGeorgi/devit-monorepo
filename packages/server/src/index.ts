import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerDocs from './utils/swagger'

import { router } from './router'
import RssController from './controllers/rss-controller'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))

app.use('/api', router)

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || '')

    app.listen(PORT, () => {
      console.log('Server started on port:', PORT)
      // initial fetch, we really need this only once
      RssController.fetchRssFeed()
      // run cron job
      RssController.scheduleFetch()
      // swagger
      swaggerDocs(app, PORT as string)
    })
  } catch (e) {
    console.error(e)
  }
}

run()
