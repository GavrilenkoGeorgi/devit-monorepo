import React, { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/index'

import { Container, Row, Col, Button } from 'react-bootstrap'

const Logout: FC = () => {

  const navigate = useNavigate()
  const { store } = useContext(Context)
  
  const handleLogout = () => {
    store.logout()
    navigate('/', { replace: true })
  }

  return <Container>
    <h1 className='text-center my-5 '>Logout</h1>
    <Row>
      <Col className='text-center'>
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </Col>
    </Row>
  </Container>
}

export default Logout
