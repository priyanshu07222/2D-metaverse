import axios from 'axios'
import React, { useRef } from 'react'

export const CreateAvatar = () => {
    const baseUrl = "http://localhost:3000/api/v1"

    const nameRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);

    const createAvatarHandler = async () => {
        const name = nameRef.current?.value
        const imageUrl = imageUrlRef.current?.value;
        if (name && imageUrl) {
            console.log(name, imageUrl)
            const response = await axios.post(`${baseUrl}/admin/avatar`, { name, imageUrl }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data.avatarId)
            nameRef.current.value = ""
            imageUrlRef.current.value = ""
            return response.data.avatarId;
        }


    }

    return (
        <div>
            <p className='text-3xl font-bold text-gray-700'>Create an Avatar</p>
            <div className='flex flex-col gap-4 w-72'>
                <input className='p-2 border border-gray-400 rounded-lg outline-none' ref={nameRef} type="text" />
                <input className='p-2 border border-gray-400 rounded-lg outline-none' ref={imageUrlRef} type="file" />
                <button className='px-4 py-2 rounded-lg text-white font-semibold bg-black' onClick={createAvatarHandler}>Create avatar</button>
            </div>
        </div>
    )
}
