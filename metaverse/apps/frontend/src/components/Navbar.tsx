import React from 'react'
import { redirect, useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    return (
        <div className='flex justify-between items-center p-4 border-b'>
            <div className='font-bold text-xl'>Metaverse</div>
            <div className=''>{
                localStorage.getItem("token") ?
                    <button
                        // onClick={() => navigate('signup')}
                        className='bg-black px-4 py-2 rounded-lg text-white font-bold'>
                        Create Event
                    </button>
                    :
                    <button
                        onClick={() => navigate('signup')}
                        className='bg-black px-4 py-2 rounded-lg text-white font-bold'>Sign Up
                    </button>
            }</div>
        </div>
    )
}
