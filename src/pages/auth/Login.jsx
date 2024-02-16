import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies;
const Login = () => {

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()


  const handleLogin = () => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    };

    fetch('http://localhost:8000/api/v1/users/login-user', options)
      .then(response => response.json())
      .then(data => {
        cookies.set('_user_token', data.data.accessToken)
        setLoading(false)

        // check userType from token
        const decoded = jwtDecode(data?.data?.accessToken) || '';

        if (decoded.userType === 'ADMIN') {
          navigate('/admin')
        } else {
          navigate('/orders')
        }


      })
      .catch(error => {
        alert("There was some error will adding data")
        console.log(error)
        setLoading(false)
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let errObj = {
      password: '',
      email: '',
    }
    if (form.password === "") {
      errObj.password = "password should not contain any number"
    } else {
      errObj.password = ""
    }

    // check email format
    let emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$g/
    if (emailExp.test(form.email) || form.email === "") {
      errObj.email = "Email should be in correct format";
    } else {
      errObj.email = ""
    }

    setFormErrors(errObj)

    // check for any errors if yes don't submit the form

    let containsErrors = Object.values(formErrors).some((val) => val === "")

    if (!containsErrors) {
      alert("Form submitted")
    }


    // send req to server
    handleLogin()
  }

  const handleSetFormData = (e) => {
    let value = e.target.value

    let data = {
      ...form,
      [e.target.name]: value
    }
    setForm(data)
  }



  return (
    <form onSubmit={handleSubmit} className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border p-10 rounded-lg shadow-lg min-w-[25rem] '>
      <h1 className='text-2xl font-bold mb-7'>Login</h1>
      <div className='flex flex-col mt-4'>
        <label className='text-sm font-semibold '>Email</label>
        <input
          type='text'
          name='email'
          onChange={handleSetFormData}
          placeholder='Enter Email...'
          className='border px-3 py-3 mt-2 rounded-md text-sm'
        />
      </div>
      {formErrors['email'] && <p className='text-xs text-red-600 mt-2'>* email should be in correct format</p>}
      <div className='flex flex-col mt-4'>
        <label className='text-sm font-semibold '>Password</label>
        <input
          type='password'
          name='password'
          onChange={handleSetFormData}
          placeholder='Enter Password...'
          className='border px-3 py-3 mt-2 rounded-md text-sm'
        />
      </div>
      {formErrors['password'] && <p className='text-xs text-red-600 mt-2'>* password cannot be empty</p>}
      <button
        className='w-full border mt-8 py-3 font-semibold text-sm text-white bg-[#fe100e] rounded-md'
        type='submit'
        disabled={loading}
      >
        {
          loading ? "Logging In..." : "Login"
        }
      </button>
    </form>
  )
}

export default Login