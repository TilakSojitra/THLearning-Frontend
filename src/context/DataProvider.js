/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const UserContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    name: '',
    roleId: undefined
  })

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  )
}
