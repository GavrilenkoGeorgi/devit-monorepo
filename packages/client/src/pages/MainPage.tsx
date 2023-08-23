import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MainPage = () => {
  return <Container>
    <Row>
      <Col xs={12}>
        <h1 className='text-center my-5'>
          DevIT RSS feed CRUD
        </h1>
      </Col>
    </Row>
  </Container>
}

export default MainPage
