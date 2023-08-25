import React, { FC, useState, useContext } from 'react'
import { Context } from '../../store'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Button } from 'react-bootstrap'

import { LoginDataSchema, LoginDataSchemaType } from '../../schemas/LoginDataSchema'

const LoginForm: FC = () => {

  const { store } = useContext(Context)

  const { register, handleSubmit, formState } = useForm<LoginDataSchemaType>({
    resolver: zodResolver(LoginDataSchema)
  })

  const onSubmit: SubmitHandler<LoginDataSchemaType> = async () => {
    const result = await store.login(email, password)
    if (result) {
      navigate('/admin', { replace: true })
    }
  }

  const navigate = useNavigate()
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  return <form noValidate onSubmit={handleSubmit(onSubmit)}>
    <div className='input-group mb-3'>
      <label htmlFor='email'>Email address</label>
      <input
        type='email'
        placeholder='Enter email'
        {...register('email')}
        onChange={e => setEmail(e.target.value)}
      />
      {formState.errors.email &&
      <div className='form-input-error'>
        {formState.errors.email.message}
      </div>
      }
    </div>

    <div className='input-group mb-3'>
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        placeholder='Password'
        {...register('password')}
        onChange={e => setPassword(e.target.value)}
      />
      {formState.errors.password &&
      <div className='form-input-error'>
        {formState.errors.password.message}
      </div>
      }
    </div>
    <div className='form-input-error'>
      {store.msg}
    </div>
    <Container className='text-center'>
      <Button
        variant='primary'
        type='submit'
        className='mx-2'
      >
        Login
      </Button>
    </Container>
  </form>
}

export default observer(LoginForm)
