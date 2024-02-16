import { jwtDecode } from 'jwt-decode';
import React from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies

const NoAccess = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <p>Restricted Access</p>
    </div>
  )
}


const ProtectedRoutes = ({ children }) => {

  let data = cookies.get('_user_token')

  if (!data) {
    return (
      <NoAccess />
    )
  }
  const decoded = jwtDecode(data);

  if (decoded.userType !== 'ADMIN') {
    return (
      <NoAccess />
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoutes