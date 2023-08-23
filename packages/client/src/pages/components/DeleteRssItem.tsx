import React, { 
  FC
} from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import RssItemsService from '../../services/RssItemsService'

type delProps = {
  id: string
}

const DeleteRssItem: FC<delProps> = ({ id }) => {

  const queryClient = useQueryClient()

  const deleteItemMutation = useMutation({
    mutationFn: RssItemsService.deleteItem,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['rss-items', { id: data._id }], data)
      queryClient.invalidateQueries(['rss-items'])
    },
  })

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    console.log('delete')
    e.preventDefault()
    deleteItemMutation.mutate(id)
  }

  return <>
    <button onClick={e => handleDelete(e)}>Delete</button>
  </>
}

export default DeleteRssItem
