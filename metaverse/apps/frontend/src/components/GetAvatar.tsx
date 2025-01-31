import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const GetAvatar = () => {
  const [avatarArray, setAvatarArray] = useState<null | []>(null)
  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/avatars`)
      console.log("avatars ", response.data)
      setAvatarArray(response.data.avatars)
    })()
  }, [])
  return (
    avatarArray && <div>{avatarArray?.map((item: { id: string, imageUrl: string, name: string }) => (
      <div key={item.id}>
        <p>{item.name}</p>
        <img src={item.imageUrl} alt="" className={`w-44`} />
        <img src="https://images.app.goo.gl/i7emByJTSbWRvj8f7" alt="" />
      </div>
    ))}</div>

  )
}
