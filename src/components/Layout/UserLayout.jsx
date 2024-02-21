import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies
const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    cookies.remove("_user_token", { path: '/' })
    navigate('/login');
  }

  return (
    <>
      <div className="flex items-center justify-between h-[4.75rem] w-full md:max-w-[1300px] lg:max-w-[1500px] xl:max-w-[1750px] px-4 md:px-8 py-2 md:py-4 lg:px-[5%] lg:py-4 xl:px-[10%] mx-auto border-b border-gray-100">
        <h1 className='font-bold text-2xl' onClick={() => navigate('/orders')}>TransportEase</h1>
        <button onClick={handleLogout} className='border border-red-400 rounded-md px-3 py-2 font-500 text-sm text-red-500 bg-red-50'>Logout</button>
      </div>
      <div className='w-full md:max-w-[1300px] lg:max-w-[1500px] xl:max-w-[1750px] px-4 md:px-8 py-2 md:py-4 lg:px-[5%] lg:py-4 xl:px-[10%] mx-auto'>
        {children}
      </div>
    </>
  )
}

export default UserLayout