import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// const cors = require('cors')
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { router } from './router'

/* eslint-disable-next-line */
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api', router)

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || '')

    app.listen(PORT, () => {
      console.log('Server started on port:', PORT)
    })
  } catch (e) {
    console.error(e)
  }
}

run()
