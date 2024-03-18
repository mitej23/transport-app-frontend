import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useNavigate } from 'react-router-dom'
import UserLayout from '../../components/Layout/UserLayout'
import Cookies from 'universal-cookie';
const cookies = new Cookies;

const LocationIcon = () => {
  return (
    <div className='ml-4 border shadow-sm p-2 h-max w-max rounded-md'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    </div>
  )
}

const CreateOrder = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState({
    productName: 'Cylinders',
    productQuantity: '6',
    pickupLocation: '',
    pickUpAddress: '',
    dropLocation: '',
    dropAddress: '',
    productType: 'Large',
  })

  const handleSetFormData = (e) => {
    let value = e.target.value
    let name = e.target.name

    let data = {
      ...productData,
      [name]: value
    }
    setProductData(data)

  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()

    setLoading(true)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        'Authorization': cookies.get('_user_token')
      },
      body: JSON.stringify(productData)
    };

    // /api/v1/orders
    fetch('http://localhost:8000/api/v1/orders/place-order', options)
      .then(response => response.json())
      .then(data => {
        navigate('/orders')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }


  return (
    <UserLayout>
      <div className='flex w-max mb-6 items-center hover:underline underline-offset-2 hover:cursor-pointer' onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mt-[-2px]">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
        <p className='ml-1'>Orders</p>
      </div>
      <h1 className='text-xl font-bold'>Create Order</h1>
      <form onSubmit={handleOrderSubmit} className='grid grid-cols-2 gap-4 mt-4'>
        <div className='flex flex-col'>
          <label className='text-sm font-semibold text-gray-500'>Product Name</label>
          <input
            type='text'
            name='productName'
            onChange={handleSetFormData}
            value={productData['productName']}
            placeholder='Enter Product Name...'
            className='border px-3 py-3 mt-2 rounded-md text-sm shadow'
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-semibold text-gray-500'>Product Quantity</label>
          <input
            type='number'
            value={productData['productQuantity']}
            name='productQuantity'
            onChange={handleSetFormData}
            placeholder='Enter Product Quantity...'
            className='border px-3 py-3 mt-2 rounded-md text-sm shadow'
            min={0}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-semibold text-gray-500'>Product Type</label>
          <input
            type='text'
            value={productData['productType']}
            name='productType'
            onChange={handleSetFormData}
            placeholder='Enter Product Type...'
            className='border px-3 py-3 mt-2 rounded-md text-sm shadow'
          />
        </div>
        <div></div>
        <div>
          <label className='text-sm font-semibold text-gray-500'>Pickup Location</label>
          <div className='flex flex-row mt-2'>
            <textarea
              type='text'
              value={productData['pickUpAddress']}
              name='pickUpAddress'
              onChange={handleSetFormData}
              placeholder='Enter pickup Address...'
              rows="4"
              className='flex-1 border px-3 py-3 rounded-md text-sm shadow'
            />
            <LocationIcon />
          </div>
        </div>
        <div>
          <label className='text-sm font-semibold text-gray-500'>Drop Location</label>
          <div className='flex flex-row mt-2'>
            <textarea
              type='text'
              value={productData['dropAddress']}
              name='dropAddress'
              onChange={handleSetFormData}
              placeholder='Enter Drop Address...'
              rows="4"
              className='flex-1 border px-3 py-3 rounded-md text-sm shadow'
            />
            <LocationIcon />
          </div>
        </div>
        <button
          type='submit'
          class="w-max mt-6 flex flex-end bg-[#fe100e] text-white shadow-sm rounded-md border px-4 py-2 text-sm font-medium focus:relative"
        >
          {
            loading ? 'Placing' : "Place Order"
          }
        </button>
      </form>
    </UserLayout>
  )
}

export default CreateOrder