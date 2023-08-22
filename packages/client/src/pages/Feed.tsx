import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RssFeedItems from './components/RssFeedItems'
import { useRssFeed } from '../queries/rss-feed'

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

  const { status, data } = useRssFeed()

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {'error.message'}</span>
        ) : ( <RssFeedItems docs={data.docs}/> )}
      </div>
    </div>
  )
}

export default Feed
