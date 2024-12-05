import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className=''>
      <div className='max-w-screen-lg mx-auto py-4 border-t border-gray-400 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Metaverse</h2>
        <div>
          <p className='text-sm'>© 2024 Metaverse Presence Inc. </p>
          <p className='text-gray-800 text-sm'>Developed and Designed by <span className='text-lg font-semibold'><Link  to="https://www.gather.town/" >Priyanshu Tiwari</Link></span> </p>
        </div>
      </div>
    </div>
  )
}
