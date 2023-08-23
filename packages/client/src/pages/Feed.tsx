import React, { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { post } from '../types'
import RssItemsService from '../services/RssItemsService'
import PaginationComponent from './components/PaginationComponent'

const Feed: FC = () => {

  const [ page, setPage ] = useState(1)

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

  return (
    <div>
      <h1>Feed</h1>
      <ul>
        {items.data.docs.map((item: post) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
      <PaginationComponent
        itemsCount={items.data.total}
        currentPage={page}
        itemsPerPage={items.data.limit}
        setPage={setPage}
      />
    </div>
  )
}

export default Feed
