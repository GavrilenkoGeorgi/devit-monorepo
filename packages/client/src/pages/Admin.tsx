import React, { FC } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import Feed from './Feed'
import CreateRssItem from './components/CreateRssItem'

const Admin: FC = () => {
  return <Container>
    <Row>
      <Col xs={12} md={8} className='m-auto'>
        <h1 className='text-center my-5'>Admin panel</h1>
        <CreateRssItem />
        <Feed />
      </Col>
    </Row>
  </Container>
}

export default Admin
