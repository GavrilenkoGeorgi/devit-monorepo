import React, { useState, FC, SetStateAction, Dispatch } from 'react'
import RssItemsService from '../../services/RssItemsService'
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

import { post } from '../../types'

type RssItemEditFormProps = {
  itemData: post,
  setShowForm: Dispatch<SetStateAction<boolean>>
}

const RssItemEditForm: FC<RssItemEditFormProps> = ({ itemData, setShowForm }) => {

  const [ title, setTitle ] = useState(itemData.title)
  const [ link, setLink ] = useState(itemData.link)

  const handleSave = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    const data = {
      title: title,
      pubDate: itemData.pubDate,
      link: itemData.link,
      _id: itemData._id
    }
    RssItemsService.updateItem(data)
    setShowForm(false)
    queryClient.setQueryData(['rss-items'], {...data, title: 'set query'})
  }

  return <div className='form-container'>
    <form>
      <input
        onChange={e => setTitle(e.target.value)}
        value={title}
        type='text'
        placeholder='Title'
      />
      <br />
      <input
        onChange={e => setLink(e.target.value)}
        value={link}
        type='text'
        placeholder='Link'
      />
      <br />
      <button onClick={handleSave}>Save</button>
    </form>
  </div>
}

export default RssItemEditForm
