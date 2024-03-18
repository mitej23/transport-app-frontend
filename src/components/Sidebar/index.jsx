import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    cookies.remove("_user_token", { path: '/' })
    navigate('/login');
  }

  return (
    <div className='fixed flex flex-col w-[250px] p-8 h-screen bg-gray-50'>
      <h1 className='w-max m-auto font-bold text-2xl'>TransportEase</h1>
      <div className='mt-14 flex flex-col flex-1'>
        <NavLink to={'/admin'} className={({ isActive }) => `flex items-center mb-2 ${isActive ? 'text-gray-600 border bg-gray-100' : 'text-[#00000099] hover:bg-gray-100 border-transparent hover:text-gray-600 border'}  p-2 rounded-md`} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M2.879 7.121A3 3 0 0 0 7.5 6.66a2.997 2.997 0 0 0 2.5 1.34 2.997 2.997 0 0 0 2.5-1.34 3 3 0 1 0 4.622-3.78l-.293-.293A2 2 0 0 0 15.415 2H4.585a2 2 0 0 0-1.414.586l-.292.292a3 3 0 0 0 0 4.243ZM3 9.032a4.507 4.507 0 0 0 4.5-.29A4.48 4.48 0 0 0 10 9.5a4.48 4.48 0 0 0 2.5-.758 4.507 4.507 0 0 0 4.5.29V16.5h.25a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5H3V9.032Z" />
          </svg>
          <p className='ml-4'>Orders</p>
        </NavLink>
        {/* <NavLink to={'/admin/users'} className={({ isActive }) => `flex items-center mb-2 ${isActive ? 'text-gray-600 border bg-gray-100' : 'text-[#00000099] hover:bg-gray-100 border-transparent hover:text-gray-600 border'}  p-2 rounded-md`} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
          <p className='ml-4'>Users</p>
        </NavLink> */}
        <div onClick={handleLogout} className={'flex items-center mb-2 hover:bg-red-200 text-[#fe100e] hover:cursor-pointer mt-auto p-2 rounded-md'}>
          <svg pointerEvents="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path pointerEvents="none" d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
          </svg>
          <p className='ml-4'>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar