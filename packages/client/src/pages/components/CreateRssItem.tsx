import React, { FC, FormEventHandler, FormEvent, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import RssItemsService from '../../services/RssItemsService'
import { Container, Button, Form } from 'react-bootstrap'

const CreateRssItem: FC = () => {

  const titleRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const createItemMutation = useMutation({
    mutationFn: RssItemsService.createItem,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['rss-items', { id: data._id }], data)
      queryClient.invalidateQueries(['rss-items'])
    },
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> =
  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createItemMutation.mutate({
      title: titleRef.current?.value || '',
      link: linkRef.current?.value || '',
      _id: ''
    })
  }

  return <Form onSubmit={handleSubmit}>
    <Form.Group className='mb-3' controlId='title'>
      <Form.Label>Title</Form.Label>
      <Form.Control type='text' placeholder='Enter title'ref={titleRef} />
    </Form.Group>

    <Form.Group className='mb-3' controlId='link'>
      <Form.Label>Link</Form.Label>
      <Form.Control type='text' placeholder='Enter link' ref={linkRef} />
    </Form.Group>
    <Container className='text-center'>
      <Button variant='primary' type='submit' className='mx-2' disabled={createItemMutation.isLoading}>
        {createItemMutation.isLoading ? 'Loading...' : 'Create'}
      </Button>

    </Container>
  </Form>
}

export default CreateRssItem
