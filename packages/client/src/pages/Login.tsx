import React from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { Container, Row, Col } from 'react-bootstrap'

const Login = () => {
  return <Container>
    <Row>
      <Col xs={12} sm={6} className='m-auto'>
        <h1 className='text-center my-5'>Login Page</h1>
        <LoginForm />
        <Notification />
      </Col>
    </Row>
  </Container>
}

export default Login
