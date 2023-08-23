import React, { FC, useState, useContext } from 'react'
import { Context } from '../../store'
import { observer } from 'mobx-react-lite'

import { useNavigate } from 'react-router-dom'

import { Container, Button, Form } from 'react-bootstrap'

const LoginForm: FC = () => {

  const navigate = useNavigate()
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const { store } = useContext(Context)

  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    store.login(email, password)
    navigate('/Admin', { replace: true })
  }

  const handleRegistration = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    store.registration(email, password)
    navigate('/', { replace: true })
  }

  return <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    <Container className='text-center'>
      <Button variant="primary" type="submit" onClick={handleLogin} className='mx-2'>
        Login
      </Button>
      <Button variant="secondary" type="submit" onClick={handleRegistration} className='mx-2'>
        Sign Up
      </Button>
    </Container>
  </Form>
}

export default observer(LoginForm)
