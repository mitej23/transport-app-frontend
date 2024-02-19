import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const statusArray = ["SHIPPED", "DELIVERED", "PENDING"]
const statusColor = { "SHIPPED": 'red', 'DELIVERED': 'green', 'PENDING': 'yellow' }

const getStatus = (status) => {
  if (status === statusArray[0]) {
    return "bg-red-100 text-red-500 border border-red-500 shadow"
  } else if (status === statusArray[1]) {
    return "bg-green-100 text-green-500 border border-green-500 shadow"
  } else if (status === statusArray[2]) {
    return "bg-yellow-100 text-yellow-500 border border-yellow-500 shadow"
  }
}

const OrderStatusButton = ({ orderStatus }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const handleStatusClick = (e) => {
    e.stopPropagation()
    setIsDropDownOpen(!isDropDownOpen)
  }

  const handleUpdateStatus = (e, st) => {
    e.stopPropagation()

  }

  return (
    <div onClick={handleStatusClick} className='relative'>
      <p className={`flex px-2 py-1 text-xs ${getStatus(orderStatus)} ml-0 rounded-md w-max m-auto`}>
        {orderStatus}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </p>
      {
        isDropDownOpen && (
          <div
            class="absolute z-10 mt-2 rounded-lg border border-gray-200 bg-white shadow-xl"
            role="menu"
          >
            <div class="p-2">
              {
                statusArray.filter(status => status !== orderStatus).map((status, idx) => {
                  return (
                    <p
                      onClick={(e) => handleUpdateStatus(e, status)}
                      class={`flex w-max items-center group rounded-lg px-2 py-1 text-xs text-center ${getStatus(status)} ${idx === 0 ? 'mb-2' : ''}`}
                    >
                      {status}
                      <span className='hidden group-hover:block ml-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </span>
                    </p>

                  )
                })
              }
            </div>
          </div>
        )
      }

    </div>
  )
}

// update order status - write api for individually updating order status using order ui -> pop up on success

const cookies = new Cookies
const Orders = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([{
    productName: 'Cylinders',
    productQuantity: '6',
    pickupLocation: '',
    pickUpAddress: '',
    dropLocation: '',
    dropAddress: '',
    productType: 'Large',
    orderStatus: "PENDING",
    owner: "Mitej Madan"
  },
  {
    productName: 'Cylinders',
    productQuantity: '6',
    pickupLocation: '',
    pickUpAddress: '',
    dropLocation: '',
    dropAddress: '',
    productType: 'Large',
    orderStatus: "PENDING",
    owner: "Mitej Madan"
  },
  {
    productName: 'Cylinders',
    productQuantity: '6',
    pickupLocation: '',
    pickUpAddress: '',
    dropLocation: '',
    dropAddress: '',
    productType: 'Large',
    orderStatus: "PENDING",
    owner: "Mitej Madan"
  },
  {
    productName: 'Cylinders',
    productQuantity: '6',
    pickupLocation: '',
    pickUpAddress: '',
    dropLocation: '',
    dropAddress: '',
    productType: 'Large',
    orderStatus: "PENDING",
    owner: "Mitej Madan"
  },
  {
    productName: 'Cylinders',
    productQuantity: '6',
    pickupLocation: '',
    pickUpAddress: '',
    dropLocation: '',
    dropAddress: '',
    productType: 'Large',
    orderStatus: "PENDING",
    owner: "Mitej Madan"
  },
  {
    productName: 'Cylinders',
    productQuantity: '6',
    pickupLocation: '',
    pickUpAddress: '',
    dropLocation: '',
    dropAddress: '',
    productType: 'Large',
    orderStatus: "PENDING",
    owner: "Mitej Madan"
  }])

  const fetchData = async () => {
    let TOKEN = cookies.get("_user_token") || "";
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
      },
    };

    fetch('http://localhost:8000/api/v1/orders/get-all-orders', options)
      .then(response => response.json())
      // .then(data => setItems(data))
      .catch(error => console.error(error));

  }

  const handleOrderClick = () => {
    console.log("order click")
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Layout>
      <div>
        <h1 className='font-bold text-2xl mb-6'>All Orders</h1>
      </div>

      <table className="border drop-shadow-md rounded-lg shadow-sm sm:rounded-lg mb-4 w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-4 text-left">
              Product Name
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Owner
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Qty.
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Type
            </th>
            <th scope="col" className="py-3 px-4 text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {
            isLoading ? (
              <tr className="bg-white border-b hover:cursor-pointer hover:bg-gray-50">
                <td className="py-3 px-7 text-center text-sm" colSpan={9}>
                  loading...
                </td>
              </tr>
            ) : (
              data.length !== 0 ? (
                data.map((order) => {
                  const { productName, productQuantity, pickupLocation, pickUpAddress, dropLocation, dropAddress, productType, orderStatus, owner } = order
                  return (
                    <tr className="bg-white border-b hover:cursor-pointer hover:bg-gray-50" onClick={handleOrderClick}>
                      <td className="py-3 px-4 text-left">
                        {productName}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {owner}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {productQuantity}
                      </td>
                      <td className="py-3 px-4 text-center relative">
                        {productType}
                      </td>
                      <td className="py-2 px-4 text-left">
                        <OrderStatusButton orderStatus={orderStatus} />
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr className="bg-white border-b hover:cursor-pointer hover:bg-gray-50">
                  <td className="py-3 px-7 text-center text-sm" colSpan={9}>
                    No stocks found
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </Layout>
  )
}

export default Orders