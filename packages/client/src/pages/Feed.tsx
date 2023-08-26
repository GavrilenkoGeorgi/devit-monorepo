import React, { FC, useState, useContext, ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Context } from '../store'
import { observer } from 'mobx-react-lite'

import { ListGroup, Container, Row, Col, Button, Form } from 'react-bootstrap'

import { post } from '../types'
import RssItemsService from '../services/RssItemsService'
import PaginationComponent from './components/PaginationComponent'
import EditRssItem from './components/EditRssItem'
import DeleteRssItem from './components/DeleteRssItem'
import { getReadableDate } from '../utils'

const Feed: FC = () => {

  const [ page, setPage ] = useState<number>(1)
  const [ edit, setEdit ] = useState<boolean>(false)
  const [ post, setPost ] = useState<post>({} as post) //!
  const [ searchValue, setSearchValue ] = useState<string>('')
  const [ order, setOrder ] = useState<number>(0)
  const { store } = useContext(Context)

  const feedQuery = useQuery({
    queryKey: ['rss-items', { order, page, searchValue }],
    keepPreviousData: true,
    queryFn: () => RssItemsService.getItems(order, page, searchValue)
  })

  if (feedQuery.status === 'loading') return <h1>Loading...</h1>
  if (feedQuery.status === 'error') {
    return <h1>{JSON.stringify(feedQuery.error)}</h1>
  }

  const { data: items } = feedQuery

  const editItem = (item: post) => {
    setEdit(true)
    setPost(item)
  }

  const search = (value: string) => {
    if (!value) setSearchValue('')
    if (value.length >= 3) {
      setSearchValue(value)
    }
  }

  const changeOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrder(parseInt(e.target.value))
  }

  const editBtns = (item: post) => {
    const pathname = window.location.pathname
    if (store.isAuth && pathname === '/admin') {
      return <Container className='d-flex justify-content-end'>
        <Button variant='primary' className='m-2' onClick={() => editItem(item)} size='sm'>
          Edit
        </Button>
        <DeleteRssItem id={item._id} />
      </Container>
    } else return null
  }

  const list = (list: post[]) => {
    return <ListGroup>{list.map((item: post) => (
      <ListGroup.Item key={item._id} className='py-3'>
        <p className='lead'>
          {item.title}
        </p>
        <p>
          {getReadableDate(item.pubDate)}
        </p>
        <div>
          {editBtns(item)}
        </div>
      </ListGroup.Item>
    ))}</ListGroup>
  }

  return (
    <Container>
      <h1 className='text-center my-5'>Feed</h1>
      <Row className='d-flex justify-content-center'>
        <Col sm={4} className='mb-2'>
          <Form.Select onChange={e => changeOrder(e)}>
            <option value={0}>Order</option>
            <option value={1}>Ascending</option>
            <option value={-1}>Descending</option>
          </Form.Select>
        </Col>
        <Col sm={4} className='mb-4'>
          <Form.Control
            type='text'
            placeholder='Search'
            onChange={e => search(e.target.value)}
          />
        </Col>
        <Col md={8}>
          {list(items.data.docs)}
        </Col>
      </Row>
      <Row>
        <Col xs={12} className='mt-5 d-flex justify-content-center'>
          <PaginationComponent
            itemsCount={items.data.total}
            currentPage={page}
            itemsPerPage={items.data.limit}
            setPage={setPage}
          />
        </Col>
      </Row>
      <EditRssItem
        open={edit}
        setEdit={setEdit}
        title={post.title}
        link={post.link}
        id={post._id}
      />
    </Container>
  )
}

export default observer(Feed)
