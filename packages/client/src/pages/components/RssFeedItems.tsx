import React from 'react'
import { post } from '../../types'

type RssFeedItemsProps = {
  docs: post[]
}

const RssFeedItems = ({ docs }: RssFeedItemsProps) => {

  return <>
    <div>
      {docs.map((post: post) => (
        <p key={post.link}>
          <a
            href={`${post.link}`}
          >
            {post.title}
          </a>
        </p>
      ))}
    </div>
  </>
}

export default RssFeedItems
