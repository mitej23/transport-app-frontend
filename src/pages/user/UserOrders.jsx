import React, { useEffect, useState } from 'react'
import UserLayout from '../../components/Layout/UserLayout'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const statusArray = ["SHIPPED", "DELIVERED", "PENDING"]
const getStatus = (status) => {
  if (status === statusArray[0]) {
    return "bg-red-100 text-red-500 border border-red-500 shadow"
  } else if (status === statusArray[1]) {
    return "bg-green-100 text-green-500 border border-green-500 shadow"
  } else if (status === statusArray[2]) {
    return "bg-yellow-100 text-yellow-500 border border-yellow-500 shadow"
  }
}

const cookies = new Cookies
const UserOrders = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const fetchData = async () => {
    let TOKEN = cookies.get("_user_token") || "";
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
      },
    };

    fetch('http://localhost:8000/api/v1/orders/get-my-orders', options)
      .then(response => response.json())
      .then(data => setData(data.data.orders))
      .catch(error => console.error(error));

  }

  const handleOrderClick = () => {
    console.log("order click")
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <UserLayout>
      <div className='flex justify-between mb-4'>
        <h1 className='text-xl font-bold'>Your Orders</h1>
        <button
          onClick={() => navigate('/create-order')}
          class="flex flex-end bg-white shadow-sm rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
        >
          Create Order
        </button>
      </div>
      <table className="border drop-shadow-md rounded-lg shadow-sm sm:rounded-lg mb-4 w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-4 text-left">
              Product Name
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Qty.
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Type
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Pickup Address
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Drop Address
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
                        {productQuantity}
                      </td>
                      <td className="py-3 px-4 text-center relative">
                        {productType}
                      </td>
                      <td className="py-3 px-4 text-center relative">
                        {pickUpAddress}
                      </td>
                      <td className="py-3 px-4 text-center relative">
                        {dropAddress}
                      </td>
                      <td className="py-2 px-4 text-left" onClick={(e) => e.stopPropagation()}>
                        {/* <OrderStatusButton orderStatus={orderStatus} /> */}
                        <p className={`flex px-2 py-1 text-xs ${getStatus(orderStatus)} ml-0 rounded-md w-max m-auto`}>
                          {orderStatus}
                        </p>
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
    </UserLayout>
  )
}

export default UserOrders