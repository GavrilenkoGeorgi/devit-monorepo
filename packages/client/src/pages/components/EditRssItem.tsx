import React, { 
  FC,
  useEffect,
  FormEventHandler,
  FormEvent, useState,
  Dispatch, SetStateAction,
} from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'

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

  if (open) {
    return (
      <div className='form-container'>
        {updateItemMutation.isError && JSON.stringify(updateItemMutation.error)}
        <h1>Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title'>Title</label>
            <input id='title'
              ref={titleRef}
              value={titleValue || ''}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='link'>Link</label>
            <input id='link'
              ref={linkRef} value={linkValue || ''}
              onChange={e => setLink(e.target.value)}
            />
          </div>
          <button disabled={updateItemMutation.isLoading}>
            {updateItemMutation.isLoading ? 'Loading...' : 'Update'}
          </button>
          <button onClick={() => setEdit(false)}>
            Close
          </button>
        </form>
      </div>
    )} else return null
}

export default EditRssItem
