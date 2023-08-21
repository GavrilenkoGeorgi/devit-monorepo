import React from 'react'
import { createRoot } from 'react-dom/client'

import './css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(<App />)
