import React, { FC, useState, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Context } from '../store'
import { observer } from 'mobx-react-lite'

import { ListGroup, Container, Row, Col, Button } from 'react-bootstrap'

import { post } from '../types'
import RssItemsService from '../services/RssItemsService'
import PaginationComponent from './components/PaginationComponent'
import EditRssItem from './components/EditRssItem'
import DeleteRssItem from './components/DeleteRssItem'

const Feed: FC = () => {

  const [ page, setPage ] = useState(1)
  const [ edit, setEdit ] = useState(false)
  const [ post, setPost ] = useState<post>({} as post)

  const { store } = useContext(Context)

  const feedQuery = useQuery({
    queryKey: ['rss-items', { page }],
    keepPreviousData: true,
    queryFn: () => RssItemsService.getItems(page)
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

  const editBtns = (item: post) => {
    const pathname = window.location.pathname
    if (store.isAuth && pathname === '/admin') {
      return <div>
        <Button variant='primary' className='m-2' onClick={() => editItem(item)}>
          Edit
        </Button>
        <DeleteRssItem id={item._id}/>
      </div>
    } else return null
  }

  return (
    <Container>
      <h1 className='text-center my-5'>Feed</h1>
      <ListGroup>
        {items.data.docs.map((item: post) => (
          <ListGroup.Item key={item._id} className='py-3 d-flex justify-content-between'>
            {item.title}
            {editBtns(item)}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Row>
        <Col xs={12} className='mt-5 d-flex justify-content-center'>
          <PaginationComponent
            itemsCount={items.data.total}
            currentPage={page}
            itemsPerPage={items.data.limit}
            setPage={setPage}
          />
        </Col>
        <EditRssItem
          open={edit}
          setEdit={setEdit}
          title={post.title}
          link={post.link}
          id={post._id}
        />
      </Row>
    </Container>
  )
}

export default observer(Feed)
