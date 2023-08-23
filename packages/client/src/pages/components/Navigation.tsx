import React from 'react'
import Nav from 'react-bootstrap/Nav'

function Navigation() {
  return (
    <Nav
      activeKey='/'
    >
      <Nav.Item>
        <Nav.Link href="/feed">Feed</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/login">Login/Register</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin">Admin</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Navigation
