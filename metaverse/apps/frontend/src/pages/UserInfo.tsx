import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UserInfo = () => {
  const baseUrl = "http://localhost:3000/api/v1"
  const [avatars, setAvatars] = useState<[{ name: string, imageUrl: string, id: string }] | undefined>()
  const [avatarId, setAvatarId] = useState<string>()
  console.log(avatarId)

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

  const handleSubmit = async () => {
    const response = await axios.post(`${baseUrl}/user/metadata`, { avatarId }, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(response.data.message)
  }
  return (
    <div className='max-w-screen-lg mx-auto pt-10'>
      <h2 className='text-xl font-bold'>User Information</h2>
      <div>
        <h1>name</h1>
      </div>
      <div>
        <h1 className='text-xl font-semibold mt-8'>Update metadeta</h1>
        <p className='text-lg font-medium text-gray-800'>Available avatars</p>
        {
          avatars ? avatars.map((item, index) => (
            <div className='bg-gray-50 my-2 inline-flex mx-4 border border-red-900' key={index} onClick={() => { setAvatarId(item.id); }}>
              {/* <p>{item.id}</p>
              <p>{item.name}</p> */}
              <img src={item.imageUrl} alt="" width={85} />
            </div>
          )) : "not found"
        }{
          avatarId &&
        <button className='bg-black block text-white px-4 py-2 rounded-lg' onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  )
}
