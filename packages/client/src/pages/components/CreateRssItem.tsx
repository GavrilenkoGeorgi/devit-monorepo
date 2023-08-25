import React, { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { NewItemSchema, NewItemSchemaType } from '../../schemas/CreateNewItemSchema'

import RssItemsService from '../../services/RssItemsService'
import { Container, Button } from 'react-bootstrap'

const CreateRssItem: FC = () => {

  const queryClient = useQueryClient()

  const createItemMutation = useMutation({
    mutationFn: RssItemsService.createItem,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['rss-items', { id: data._id }], data)
      queryClient.invalidateQueries(['rss-items'])
    },
  })

  const { register, reset, handleSubmit, formState } = useForm<NewItemSchemaType>({
    resolver: zodResolver(NewItemSchema)
  })

  const onSubmit: SubmitHandler<NewItemSchemaType> = (data) => {
    const date: Date = new Date()
    createItemMutation.mutate({
      title: data.title || '',
      link: data.link || '',
      _id: '', // id is generated on the backend
      pubDate: date.toISOString()
    })
    reset()
  }

  return <form noValidate onSubmit={handleSubmit(onSubmit)}>
    <div className='input-group mb-3'>
      <label>Title</label>
      <input
        type='text'
        placeholder='Enter title'
        {...register('title')}
      />
      {formState.errors.title &&
      <div className='form-input-error'>
        {formState.errors.title.message}
      </div>}
    </div>

    <div className='input-group mb-3'>
      <label>Link</label>
      <input
        type='text'
        placeholder='Enter link'
        {...register('link')}
      />
      {formState.errors.link &&
      <div className='form-input-error'>
        {formState.errors.link.message}
      </div>}
    </div>
    <Container className='text-center'>
      <Button variant='primary' type='submit' className='mx-2' disabled={createItemMutation.isLoading}>
        {createItemMutation.isLoading ? 'Loading...' : 'Create'}
      </Button>

    </Container>
  </form>
}

export default CreateRssItem
