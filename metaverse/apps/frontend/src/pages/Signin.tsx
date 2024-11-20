import axios from 'axios'
import React, { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

export const Signin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
//   const [type, setType] = useState('user')
  const navigate = useNavigate()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log("heelo dossto", username, password)
    const response = await axios.post('http://localhost:3000/api/v1/signin', { username, password })
    console.log(response.data)
    if (response.data.token) {
      console.log(response.data.token)
      localStorage.setItem("token", response.data.token)
      console.log("got it 2")
      navigate('/')
    }
    // setUsername('')
    // setPassword('')
  }
  return (
    <div className='border p-8 max-w-screen-sm mx-auto flex flex-col items-center'>
      <div className='mb-8'>
        <p className='text-2xl font-semibold'>Welcome to Metaverse</p>
        <h2 className='text-center text-xl'>SignIn</h2>
      </div>
      <div className='flex flex-col gap-4'>
        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='username' className='border rounded p-2 outline-none' />
        <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder='********' className='border rounded p-2 outline-none' />
        {/* <select onChange={(e) => setType(e.target.value)} className='bg-white p-2 rounded-lg border'>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select> */}
        <button onClick={handleSubmit} className='bg-black text-white px-4 py-2 rounded-lg'>Sign In</button>
      </div>
    </div>
  )
}
