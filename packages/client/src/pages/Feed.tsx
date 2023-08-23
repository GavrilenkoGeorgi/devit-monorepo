import React, { FC, useState, useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Context } from '../index'

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

  useEffect(() => {
    console.log(store.isAuth)
  }, [store.isAuth])

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

  const editBtn = (item: post) => {
    if (store.isAuth) {
      return <div>
        <button onClick={() => editItem(item)}>edit</button>
        <DeleteRssItem id={item._id}/>
      </div>
    } else return null
  }

  return (
    <div>
      <h1>Feed</h1>
      <ul>
        {items.data.docs.map((item: post) => (
          <div key={item._id}>
            <li key={item._id}>{item.title}</li>
            {editBtn(item)}
          </div>
        ))}
      </ul>
      <PaginationComponent
        itemsCount={items.data.total}
        currentPage={page}
        itemsPerPage={items.data.limit}
        setPage={setPage}
      />
      <EditRssItem
        open={edit}
        setEdit={setEdit}
        title={post.title}
        link={post.link}
        id={post._id}
      />
    </div>
  )
}

export default Feed
