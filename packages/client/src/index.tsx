import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import Store from './store/store'

import './css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'

// --- import!
interface State {
  store: Store
}

const store = new Store()

export const Context = createContext<State>({
  store
})
// ---

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(
  <Context.Provider value={{store}}>
    <App />
  </Context.Provider>
)
