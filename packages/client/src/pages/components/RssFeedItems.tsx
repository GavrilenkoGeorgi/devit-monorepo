import React, { useState } from 'react'
import { post } from '../../types'

import RssItemEditForm from './RssItemEditForm'

type RssFeedItemsProps = {
  docs: post[]
}

const RssFeedItems = ({ docs }: RssFeedItemsProps) => {

  const [ showForm, setShowForm ] = useState(false)
  const [ itemData, setItemData ] = useState<post>({} as post)

  const editItem = (post: post) => {
    console.log('editing', post)
    setItemData(post)
    setShowForm(true)
  }

  return <>
    <div>
      {docs.map((post: post) => (
        <div key={post.link}>
          <p>
            <a
              href={`${post.link}`}
            >
              {post.title}
            </a>
          </p>
          <button onClick={() => editItem(post)}>
            edit
          </button>
        </div>
      ))}
      {showForm &&
        <div>
          <RssItemEditForm itemData={itemData} />
        </div>
      }
    </div>
  </>
}

export default RssFeedItems
