import React, { 
  FC,
  useEffect,
  FormEventHandler,
  FormEvent, useState,
  Dispatch, SetStateAction, useRef
} from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


import RssItemsService from '../../services/RssItemsService'

type EditRssItemProps = {
  title: string,
  link: string,
  open: boolean,
  setEdit: Dispatch<SetStateAction<boolean>>,
  id: string
}

const EditRssItem: FC<EditRssItemProps> = ({ id, title, link, open, setEdit }) => {

  const [ titleValue, setTitle ] = useState('')
  const [ linkValue, setLink ] = useState('')

  useEffect(() => {
    setTitle(title)
    setLink(link)
  }, [title])

  const titleRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const updateItemMutation = useMutation({
    mutationFn: RssItemsService.updateItem,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['rss-items', { id: data._id }], data)
      queryClient.invalidateQueries(['rss-items'])
    },
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> =
  (e: FormEvent<HTMLFormElement>) => {
    console.log('update')
    e.preventDefault()
    updateItemMutation.mutate({
      title: titleRef.current?.value || '',
      link: linkRef.current?.value || '',
      pubDate: '2023-08-20T18:05:36.000Z', // real date!
      _id: id
    })
    setEdit(false)
  }

  if (!open) return null

  return (
    <Container className='form-container'>
      <Row>
        {updateItemMutation.isError && JSON.stringify(updateItemMutation.error)}
        <Col>
          <Form onSubmit={handleSubmit} className='edit-form'>
            <h1 className='text-center mb-5'>Edit Post</h1>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                ref={titleRef}
                value={titleValue || ''}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="link">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                ref={linkRef} value={linkValue || ''}
                onChange={e => setLink(e.target.value)}
              />
            </Form.Group>
            <Container className='text-center'>
              <Button type='submit' disabled={updateItemMutation.isLoading} className='mx-3'>
                {updateItemMutation.isLoading ? 'Loading...' : 'Update'}
              </Button>
              <Button onClick={() => setEdit(false)} className='mx-3' variant='secondary'>
                Cancel
              </Button>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default EditRssItem
