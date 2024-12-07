import React from 'react'

export const Spaces = () => {
  return (
    <div className='max-w-screen-lg mx-auto py-24'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='font-semibold text-xl'>My Spaces</h3>
        <div className='flex gap-4'>
          <input type="text" placeholder='Search Spaces' className='border rounded-lg outline-none border-gray-600 p-2' />
          <button className='text-white bg-gray-800 px-4 py-2 rounded-lg font-semibold'>Enter with code</button>
          <button className='text-white bg-black px-4 py-2 rounded-lg font-semibold'>Create space</button>
        </div>
      </div>

      <div className='mt-10'>
        <img src="https://cdn-static.zep.us/uploads/spaces/6p0ZV2/thumbnail/70f9d80241a542acb8c0f053e01389f2/0.webp?w=600" alt="" className='rounded-lg' width={300} height={300} />
        <p className='m-2 font-medium'>Name of the space</p>
      </div>
    </div>
  )
}
