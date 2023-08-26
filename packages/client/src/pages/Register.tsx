// eslint-disable1
import React, { FC, useContext } from 'react'
import { Context } from '../store'
import { observer } from 'mobx-react-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import { RegisterFormSchema, RegisterFormSchemaType } from '../schemas/RegisterFormSchema'

const Register: FC = () => {

  const { store } = useContext(Context)
  const navigate = useNavigate()

  const { register, handleSubmit, formState } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema)
  })

  const onSubmit: SubmitHandler<RegisterFormSchemaType> = async (data) => {
    await store.registration(data.email, data.password)
    navigate('/admin', { replace: true })
  }

  return <Container>
    <Row>
      <Col xs={12} sm={6} className='m-auto'>
        <h1 className='text-center my-5'>Register</h1>
        {/* <pre>
          {JSON.stringify(watch(), null, 2)}
        </pre> */}
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='email'
              isInvalid={!!formState.errors.email?.message || false}
              {...register('email')}
            />
            <Form.Control.Feedback type='invalid'>
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
            <Form.Control.Feedback type='invalid'>
              {formState.errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Container className='text-center'>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Container>
        </Form>
      </Col>
    </Row>
  </Container>
}

export default observer(Register)
