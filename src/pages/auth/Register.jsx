import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';

const cookies = new Cookies;

const Register = () => {

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()


  const handleRegister = () => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    };

    fetch('http://localhost:8000/api/v1/users/register-user', options)
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        toast.success("User Regsitered Successfully")
        navigate('/login')
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
      fullName: ''
    }
    if (form.fullName === "") {

    }

    if (form.password === "") {
      errObj.password = "password cannot be empty"
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
    handleRegister()
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
      <h1 className='text-2xl font-bold mb-7'>Register</h1>
      <div className='flex flex-col mt-4'>
        <label className='text-sm font-semibold '>Full Name</label>
        <input
          type='text'
          name='fullName'
          onChange={handleSetFormData}
          placeholder='Enter Full Name...'
          className='border px-3 py-3 mt-2 rounded-md text-sm'
        />
      </div>
      {formErrors['fullName'] && <p className='text-xs text-red-600 mt-2'>* name cannot be empty</p>}
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
          loading ? "Registering..." : "Register"
        }
      </button>
      <p className='text-sm mt-3'>Already an user ? <Link to={'/login'} className='underline text-[#fe100e]'>Login</Link></p>
    </form>
  )
}

export default Register