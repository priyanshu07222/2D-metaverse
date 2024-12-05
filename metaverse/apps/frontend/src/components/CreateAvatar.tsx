import axios from "axios";
import React, { useRef } from "react";

export const CreateAvatar = () => {
    const baseUrl = "http://localhost:3000/api/v1";

    const nameRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);

    const createAvatarHandler = async () => {
        const name = nameRef.current?.value;
        const file = imageUrlRef.current?.files?.[0]; 

        if (!name || !file) {
            console.error("Name or file is missing");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);

        try {
            const response = await axios.post(
                `${baseUrl}/admin/avatar`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Avatar ID:", response.data.avatarId);

            nameRef.current.value = "";
            imageUrlRef.current.value = ""; 
        } catch (error) {
            console.error("Error creating avatar:", error);
        }
    };

    return (
        <div>
            <p className="text-3xl font-bold text-gray-700">Create an Avatar</p>
            <div className="flex flex-col gap-4 w-72">
                <input
                    className="p-2 border border-gray-400 rounded-lg outline-none"
                    ref={nameRef}
                    type="text"
                    placeholder="Avatar Name"
                />
                <input
                    className="p-2 border border-gray-400 rounded-lg outline-none"
                    ref={imageUrlRef}
                    type="file"
                    accept="image/*"
                />
                <button
                    className="px-4 py-2 rounded-lg text-white font-semibold bg-black"
                    onClick={createAvatarHandler}
                >
                    Create Avatar
                </button>
            </div>
        </div>
    );
};
