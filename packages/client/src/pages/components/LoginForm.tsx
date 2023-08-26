import React, { FC, useContext } from 'react'
import { Context } from '../../store'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Form, Button } from 'react-bootstrap'

import { LoginDataSchema, LoginDataSchemaType } from '../../schemas/LoginDataSchema'

const LoginForm: FC = () => {

  const navigate = useNavigate()
  const { store } = useContext(Context)
  const { register, handleSubmit, formState } = useForm<LoginDataSchemaType>({
    resolver: zodResolver(LoginDataSchema)
  })

  const onSubmit: SubmitHandler<LoginDataSchemaType> = async (data) => {
    const result = await store.login(data.email, data.password)
    if (result) {
      navigate('/admin', { replace: true })
    }
  }

  return <Form noValidate onSubmit={handleSubmit(onSubmit)}>
    <Form.Group className='mb-3' controlId='email'>
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type='email'
        placeholder='Enter email'
        isInvalid={!!formState.errors.email?.message || false}
        {...register('email')}
      />
      <Form.Control.Feedback type="invalid">
        {formState.errors.email?.message}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className='mb-3' controlId='password'>
      <Form.Label>Password</Form.Label>
      <Form.Control
        type='password'
        placeholder='Enter password'
        isInvalid={!!formState.errors.password?.message || false}
        {...register('password')}
      />
      <Form.Control.Feedback type="invalid">
        {formState.errors.password?.message}
      </Form.Control.Feedback>
    </Form.Group>

    <Container className='text-center'>
      <Button
        variant='primary'
        type='submit'
        className='mx-2'
      >
        Login
      </Button>
    </Container>
  </Form>
}

export default observer(LoginForm)
