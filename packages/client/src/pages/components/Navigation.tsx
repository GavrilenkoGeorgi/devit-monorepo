import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import { Context } from '../../store'
import { observer } from 'mobx-react-lite'

function Navigation() {

  const { store } = useContext(Context)

  return (
    <Nav
      activeKey='/'
    >
      <Nav.Item>
        <Nav.Link href="/feed">Feed</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin" disabled={!store.isAuth}>
          Admin
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/login">
          Login
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/logout" disabled={!store.isAuth}>
          Logout
        </Nav.Link>
      </Nav.Item>
      <div className='current-user'>
        {store.user.email}
      </div>
    </Nav>
  )
}

export default observer(Navigation)
