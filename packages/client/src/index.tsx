import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import MainPage from './pages/MainPage'

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(<MainPage />)
