import { createContext } from 'react'
import Store from './store'
import { State } from '../types'

const store = new Store()

const Context = createContext<State>({
  store
})

export { store, Context } 
