import React, { FC, useContext } from 'react'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

import { Context } from '../../store'
import { observer } from 'mobx-react-lite'

const Notification: FC = () => {

  const { store } = useContext(Context)

  if (store.msg) {
    return <Container
      className='alert-container'
    >
      <Alert variant='danger' onClose={() => store.setMessage('')} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        <p className='m-0'>
          {store.msg}
        </p>
      </Alert>
    </Container>
  }
  return null
}

export default observer(Notification)
