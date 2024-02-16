import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies
const Orders = () => {

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

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Layout>
      <h1 className='font-bold text-2xl'>All Orders</h1>
    </Layout>
  )
}

export default Orders