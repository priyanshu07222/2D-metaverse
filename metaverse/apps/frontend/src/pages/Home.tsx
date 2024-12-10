import React, { useEffect } from 'react'
import Phaser from 'phaser'
import phaserGameConfig from '../utils/phaser'
import Websocket from 'ws'

export const Home = () => {





    // useEffect(() => {
    //     const ws = new WebSocket('ws://localhost:3001');

    //     ws.onopen = () =>{
    //         const data = {
    //             "type": "join",
    //             "payload": {
    //                 "spaceId": "123",
    //                 "token": localStorage.getItem('token')
    //             }
    //         }
    //         ws.send(JSON.stringify(data))
    //     }

    //     ws.onmessage =  (event) => {
    //         console.log("Message from server",JSON.parse(event.data))
    //     }

    // }, [])

    return (
        <div>
            <div className='py-4 h-[80vh] pt-56 bg-slate-100 '>
                <div className='max-w-screen-2xl mx-auto flex justify-between items-center'>
                    {/* left side */}
                    <div className='w-1/2 px-8'>
                        <h1 className='text-6xl font-bold my-2 font-mono'>Your virtual HQ</h1>
                        <p className='text-2xl font-mono'>Metaverse brings the best of in-person collaboration to distributed teams.</p>
                        <button className='px-4 py-2 rounded-lg border border-gray-500 font-semibold bg-gray-800 text-white mt-4'>Get started</button>
                    </div>
                    {/* right side */}
                    <div className='w-1/2'>
                        <img src="https://cdn-static.zep.us/uploads/spaces/6p0ZV2/thumbnail/70f9d80241a542acb8c0f053e01389f2/0.webp?w=600" alt="" className='rounded-lg' />
                    </div>
                </div>
            </div>
            <div className=''>
                <h1 className='text-center py-16 text-5xl font-semibold'>The in-person moments <br /> you’ve been missing</h1>
                <div className='max-w-screen-lg mx-auto mt-16 flex py-10 items-center gap-4 '>
                    <div className='w-1/2 '>
                        <p className='text-lg font-semibold text-gray-600'>PROXIMITY AND VISIBILITY</p>
                        <h2 className='text-4xl font-bold my-4'>Bring your remote team closer together</h2>
                        <p className='text-lg font-base text-gray-700'>Communicate, collaborate, and feel more connected in a persistent space that reflects your unique team culture.</p>
                    </div>
                    <div className='w-1/2 '>
                        <img src="https://cdn-static.zep.us/uploads/spaces/6p0ZV2/thumbnail/70f9d80241a542acb8c0f053e01389f2/0.webp?w=600" alt="" className='rounded-lg' />
                    </div>
                </div>

                <div className='max-w-screen-lg mx-auto mt-16 flex flex-row-reverse py-10 items-center gap-4 '>
                    <div className='w-1/2 pl-10'>
                        <p className='text-lg font-semibold text-gray-600'>PRODUCTIVE CONVERSATIONS</p>
                        <h2 className='text-4xl font-bold my-4'>Meet in the moment</h2>
                        <p className='text-lg font-base text-gray-700'>Collaborate in the moment or schedule team meetings to keep everyone aligned and work moving forward.</p>
                    </div>
                    <div className='w-1/2 '>
                        <img src="https://cdn-static.zep.us/uploads/spaces/6p0ZV2/thumbnail/70f9d80241a542acb8c0f053e01389f2/0.webp?w=600" alt="" className='rounded-lg' />
                    </div>
                </div>
            </div>
        </div>
    )
}
