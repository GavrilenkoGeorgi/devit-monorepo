import React, { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'react-bootstrap'

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

  const handleDelete = () => {
    deleteItemMutation.mutate(id)
  }

  return <Button variant='danger' onClick={() => handleDelete()}>Delete</Button>
}

export default DeleteRssItem