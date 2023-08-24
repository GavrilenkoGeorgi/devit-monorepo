import React, { FC, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'react-bootstrap'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import RssItemsService from '../../services/RssItemsService'
import { NewItemSchema, NewItemSchemaType } from '../../schemas/CreateNewItemSchema'
import { EditRssItemProps } from '../../types'

const EditRssItem: FC<EditRssItemProps> = ({ id, title, link, open, setEdit }) => {

  const [ titleValue, setTitle ] = useState('')
  const [ linkValue, setLink ] = useState('')

  const { register, reset, handleSubmit, formState } = useForm<NewItemSchemaType>({
    resolver: zodResolver(NewItemSchema)
  })

  const onSubmit: SubmitHandler<NewItemSchemaType> = (data) => {
    updateItemMutation.mutate({
      title: data.title,
      link: data.link,
      pubDate: '2023-08-20T18:05:36.000Z', // real date!!
      _id: id
    })
    setEdit(false)
  }

  useEffect(() => {
    reset()
    setTitle(title)
    setLink(link)
  }, [open])

  const queryClient = useQueryClient()

  const updateItemMutation = useMutation({
    mutationFn: RssItemsService.updateItem,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['rss-items', { id: data._id }], data)
      queryClient.invalidateQueries(['rss-items'])
    },
  })

  if (!open) return null

  return (
    <div className='form-container'>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className='edit-form'>
        <h1 className='text-center mb-5'>Edit Post</h1>
        <div className='input-group mb-3'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            defaultValue={titleValue}
            {...register('title')}
          />
          {formState.errors.title &&
          <div className='form-input-error'>
            {formState.errors.title.message}
          </div>}
        </div>

        <div className='input-group mb-3'>
          <label htmlFor='link'>Link</label>
          <input
            type='text'
            defaultValue={linkValue}
            {...register('link')}
          />
          {formState.errors.link &&
          <div className='form-input-error'>
            {formState.errors.link.message}
          </div>}
        </div>
        <div className='text-center'>
          <Button type='submit' disabled={updateItemMutation.isLoading} className='mx-3' size='lg'>
            {updateItemMutation.isLoading ? 'Loading...' : 'Update'}
          </Button>
          <Button onClick={() => setEdit(false)} className='mx-3' variant='secondary'>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditRssItem
