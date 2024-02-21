import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import OrderStatusButton from '../../components/StatusButton/StatusButton';


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
      <div class="mb-6">
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="flex flex-col rounded-lg border border-gray-100 shadow px-4 py-8 text-center">
            <dt class="order-last text-lg font-medium text-gray-500">Total Sales</dt>

            <dd class="text-4xl font-extrabold text-blue-600 md:text-3xl">₹4.8m</dd>
          </div>

          <div class="flex flex-col rounded-lg border border-gray-100 shadow px-4 py-8 text-center">
            <dt class="order-last text-lg font-medium text-gray-500">Total Orders</dt>

            <dd class="text-4xl font-extrabold text-blue-600 md:text-3xl">24</dd>
          </div>

          <div class="flex flex-col rounded-lg border border-gray-100 shadow px-4 py-8 text-center">
            <dt class="order-last text-lg font-medium text-gray-500">Total Customers</dt>

            <dd class="text-4xl font-extrabold text-blue-600 md:text-3xl">12</dd>
          </div>
        </dl>
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
                      <td className="py-2 px-4 text-left" onClick={(e) => e.stopPropagation()}>
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