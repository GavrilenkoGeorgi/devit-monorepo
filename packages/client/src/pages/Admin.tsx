import React, { FC } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import Feed from './Feed'
import CreateRssItem from './components/CreateRssItem'

const Admin: FC = () => {
  return <Container>
    <h1 className='text-center my-5'>Admin panel</h1>
    <Row className='flex-column align-items-center'>
      <Col md={5}>
        <CreateRssItem />
      </Col>
      <Col>
        <Feed />
      </Col>
    </Row>
  </Container>
}

export default Admin
