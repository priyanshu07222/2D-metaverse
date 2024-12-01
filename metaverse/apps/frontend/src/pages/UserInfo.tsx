import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UserInfo = () => {
  const baseUrl = "http://localhost:3000/api/v1"
  const [avatars, setAvatars] = useState<[{ name: string, imageUrl: string, id: string }] | undefined>()

  useEffect(() => {
    (async function getAvailableAvatar() {
      const response = await axios.get(`${baseUrl}/avatars`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setAvatars(response.data.avatars)
      console.log(response.data.avatars)
    })()
  }, [])
  return (
    <div>
      <h2 className='text-2xl font-bold'>User Information</h2>
      <div>
        <h1>name</h1>
      </div>
      <div>
        <h1>Update metadeta</h1>
        <p>show available avatars</p>
        {
          avatars ? avatars.map((item, index) => (
            <div className='bg-gray-50 my-2'>
              <p>{item.id}</p>
              <p>{item.name}</p>
              <img src={item.imageUrl} alt="" />
            </div>
          )) : "not found"
        }
        <button>Submit</button>
      </div>
    </div>
  )
}
