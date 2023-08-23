import React from 'react'
import LoginForm from './components/LoginForm'

import { Container, Row, Col } from 'react-bootstrap'

const Login = () => {
  return <Container>
    <Row>
      <Col xs={12}>
        <h1 className='text-center my-5'>Login Page</h1>
        <LoginForm />
      </Col>
    </Row>
  </Container>
}

export default Login
