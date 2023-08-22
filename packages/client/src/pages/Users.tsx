import React, { FC, useState, useEffect } from 'react'

import { IUser } from '../models/IUser'
import UserService from '../services/UserService'

const Users: FC = () => {

  const [ users, setUsers ] = useState<IUser[]>([])

  const getUsers = async () => {
    try {
      const { data } = await UserService.fetchUsers()
      setUsers(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return <>
    {users.map(item =>
      <div key={item.email}>
        {item.email}
      </div>
    )}
  </>
}

export default Users
