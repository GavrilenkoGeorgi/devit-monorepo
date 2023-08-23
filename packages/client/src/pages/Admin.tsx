import React, { FC } from 'react'
import Feed from './Feed'
import CreateRssItem from './components/CreateRssItem'

const Admin: FC = () => {
  return <>
    <h1>Admin</h1>
    <section>
      <CreateRssItem />
      <Feed />
    </section>
  </>
}

export default Admin
