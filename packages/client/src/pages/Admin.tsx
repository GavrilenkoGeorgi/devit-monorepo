import React, { FC } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import Feed from './Feed'
import CreateRssItem from './components/CreateRssItem'

const Admin: FC = () => {
  return <Container>
    <Row>
      <Col>
        <h1 className='text-center my-5'>Admin</h1>
        <CreateRssItem />
        <Feed />
      </Col>
    </Row>
  </Container>
}

export default Admin
