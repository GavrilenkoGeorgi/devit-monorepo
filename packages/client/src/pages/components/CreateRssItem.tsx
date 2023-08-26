import React, { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { NewItemSchema, NewItemSchemaType } from '../../schemas/NewItemSchema'

import RssItemsService from '../../services/RssItemsService'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { pubDateForPost } from '../../utils'

const CreateRssItem: FC = () => {

  const queryClient = useQueryClient()

  const createItemMutation = useMutation({
    mutationFn: RssItemsService.createItem,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['rss-items', { id: data._id }], (oldData) => oldData ? { ...oldData, data }:  oldData)
      queryClient.invalidateQueries(['rss-items'])
    },
  })

  const { register, reset, handleSubmit, formState } = useForm<NewItemSchemaType>({
    resolver: zodResolver(NewItemSchema)
  })

  const onSubmit: SubmitHandler<NewItemSchemaType> = (data) => {
    createItemMutation.mutate({
      title: data.title || '',
      link: data.link || '',
      _id: '', // id is generated on the backend
      pubDate: pubDateForPost()
    })
    reset()
  }

  return <Container>
    <Row>
      <Col className='border rounded p-4 mx-2'>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              aria-describedby="titleHelpBlock"
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
              isInvalid={!!formState.errors.link?.message || false}
              {...register('link')}
            />
            <Form.Control.Feedback type='invalid'>
              {formState.errors.link?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Container className='text-center'>
            <Button variant='primary' type='submit' className='mx-2' disabled={createItemMutation.isLoading}>
              {createItemMutation.isLoading ? 'Loading...' : 'Create'}
            </Button>

          </Container>
        </Form>
      </Col>
    </Row>
  </Container>
}

export default CreateRssItem
