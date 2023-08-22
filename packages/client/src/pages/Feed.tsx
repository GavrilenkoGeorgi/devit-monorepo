import React, { FC, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RssFeedItems from './components/RssFeedItems'
import { useRssFeed } from '../queries/rss-feed'

import PaginationComponent from './components/PaginationComponent'

const queryClient = new QueryClient()

const Feed: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
const Posts = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [url, setUrl] = useState('http://localhost:5000/api/rss-items') // this url need fixing!
  const { status, data, refetch } = useRssFeed(url)

  useEffect(() => {
    refetch()
  }, [url])

  return (
    <div>
      <h1>RSS feed</h1>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {'error.message'}</span>
        ) : ( <div>
          <RssFeedItems docs={data.docs}/>
          <div>
            Total: {data.total}
          </div>
          <div>
            <div>
              <PaginationComponent
                itemsCount={data.total}
                currentPage={currentPage}
                itemsPerPage={data.limit}
                setCurrentPage={setCurrentPage}
                setUrl={setUrl}
              />
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default Feed
