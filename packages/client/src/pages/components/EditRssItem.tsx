import React, { FC, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import RssItemsService from '../../services/RssItemsService'
import { NewItemSchema, NewItemSchemaType } from '../../schemas/NewItemSchema'
import { EditRssItemProps } from '../../types'
import { pubDateForPost } from '../../utils'
import { Form, Button, Container } from 'react-bootstrap'

const EditRssItem: FC<EditRssItemProps> = ({ id, title, link, open, setEdit }) => {

  const [ titleValue, setTitle ] = useState('')
  const [ linkValue, setLink ] = useState('')

  const { register, reset, handleSubmit, formState } = useForm<NewItemSchemaType>({
    resolver: zodResolver(NewItemSchema)
  })

  const onSubmit: SubmitHandler<NewItemSchemaType> = (data) => {
    updateItemMutation.mutate({
      title: data.title,
      link: data.link,
      pubDate: pubDateForPost(),
      _id: id
    })
    setEdit(false)
  }

  useEffect(() => {
    reset()
    setTitle(title)
    setLink(link)
  }, [open])

  const queryClient = useQueryClient()

  const updateItemMutation = useMutation({
    mutationFn: RssItemsService.updateItem,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['rss-items', { id: data._id }], (oldData) => oldData ? { ...oldData, data }:  oldData)
      queryClient.invalidateQueries(['rss-items'])
    },
  })

  if (!open) return null

  return (
    <div className='form-overlay'>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className='edit-form'>
        <h1 className='text-center mb-5'>Edit Post</h1>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            defaultValue={titleValue}
            isInvalid={!!formState.errors.title?.message || false}
            {...register('title')}
          />
          <Form.Control.Feedback type='invalid'>
            {formState.errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Link</Form.Label>
          <Form.Control
            type='text'
            defaultValue={linkValue}
            isInvalid={!!formState.errors.link?.message || false}
            {...register('link')}
          />
          <Form.Control.Feedback type='invalid'>
            {formState.errors.link?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Container className='text-center'>
          <Button type='submit' disabled={updateItemMutation.isLoading} className='mx-3' size='sm'>
            {updateItemMutation.isLoading ? 'Loading...' : 'Update'}
          </Button>
          <Button onClick={() => setEdit(false)} className='mx-3' variant='secondary' size='sm'>
            Cancel
          </Button>
        </Container>
      </Form>
    </div>
  )
}

export default EditRssItem
