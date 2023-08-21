import express from 'express'
import mongoose from 'mongoose'

// const cors = require('cors')
import cookieParser from 'cookie-parser'

/* eslint-disable-next-line */
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())

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
