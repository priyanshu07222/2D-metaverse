import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const GetElement = () => {
  const [elementArray, setElementArray] = useState<null | []>(null)
  useEffect(() => {
    (async () => {
      const response = await axios.post(`http://localhost:3000/api/v1/elements`)
      console.log("getelement ", response.data)
      setElementArray(response.data.elements)
    })()
  }, [])

  console.log("now", elementArray);
  return (
    elementArray && <div>{elementArray?.map((item: { id: string, imageUrl: string, static: boolean, width: number, height: number }) => (
      <div key={item.id}>

        <img src={item.imageUrl} alt="" className={`w-${item.width} h-${item.height}`} />
      </div>
    ))}</div>
  )
}
