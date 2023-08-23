import React, { FC, FormEventHandler, FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'

import RssItemsService from '../../services/RssItemsService'

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
      pubDate: 'date', //!
    })
  }

  return (
    <div>
      {createItemMutation.isError && JSON.stringify(createItemMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input id='title' ref={titleRef} />
        </div>
        <div>
          <label htmlFor='body'>Body</label>
          <input id='link' ref={linkRef} />
        </div>
        <button disabled={createItemMutation.isLoading}>
          {createItemMutation.isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default CreateRssItem
