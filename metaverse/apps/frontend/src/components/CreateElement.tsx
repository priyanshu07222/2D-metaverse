import axios from 'axios'
import React, { useRef, useState } from 'react'

export const CreateElement = () => {
    const imageUrlRef = useRef<HTMLInputElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [isStatic, setIsStatic] = useState(false);
    const [elementId, setElementId] = useState('')

    const file = new FormData()
    // need to work on this
    // file.append('file', imageUrlRef?.current?.files.[0])
    const createElement = async () => {
        const response = await axios.post('http://localhost:3000/api/v1/admin/element', { file, width, height, isStatic }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
    }

    console.log("isCHecke check", isStatic)

    const updateElement = async () => {
        const response = await axios.put(`http://localhost:3000/api/v1/admin/element/:${elementId}`)
    }
    return (
        <div className=''>
            <div>
                <h3 className='font-semibold text-xl text-gray-700'>Create Element</h3>
                <input type="file" className='py-2 file:p-2 file:text-black text-black overflow-x-sc' ref={imageUrlRef} />
                <div className='flex gap-2 items-center'>
                    <p className='text-gray-700 font-semibold'>Size(%)</p>
                    <div className='flex gap-2 my-2 items-center'>
                        <p className='text-gray-700 font-semibold'>W</p>
                        <input onChange={(e) => setWidth(Number(e.target.value))} type="number" className='border outline-none border-gray-300 w-16 text-black  p-2 rounded-lg' />
                    </div>
                    <div className='flex gap-2 my-2 items-center'>
                        <p className='text-gray-700 font-semibold'>H</p>
                        <input onChange={(e) => setHeight(Number(e.target.value))} type="number" className='border outline-none border-gray-300 w-16 text-black  rounded-lg p-2' />
                    </div>
                </div>
                <div className='flex items-center justify-between  mb-4'>
                    <p className='text-gray-700 font-semibold'>Static</p>
                    <div className='border px-8 py-2 rounded-full'>

                        <input onChange={(e) => setIsStatic(!isStatic)} type="checkbox" className='border p-4 checked:p-2 checked:outline-none mt-2 text-black ' />
                    </div>
                </div>

                <button className='px-4 py-2 rounded-lg text-white font-semibold bg-black'>Create element</button>
            </div>
        </div>
    )
}
