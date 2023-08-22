import React, { FC, useState, useContext } from 'react'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'

import { useNavigate } from 'react-router-dom'

const LoginForm: FC = () => {

  const navigate = useNavigate()
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const { store } = useContext(Context)

  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    store.login(email, password)
    console.log('login')
    navigate('/', { replace: true })
  }
  return <div>
    <form>
      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type='text'
        placeholder='Email'
      />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password'
        placeholder='Password'
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => store.registration(email, password)}>Register</button>
    </form>
  </div>
}

export default observer(LoginForm)
