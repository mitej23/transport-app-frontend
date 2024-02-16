import React from 'react'

const UserLayout = ({ children }) => {
  return (
    <div>
      <p>UserLayout</p>
      <div>
        {children}
      </div>
    </div>
  )
}

export default UserLayout