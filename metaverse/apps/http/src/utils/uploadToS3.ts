import { PutObjectCommand } from "@aws-sdk/client-s3"
import s3Client from "./s3Connect"
import fs from 'fs'

const uploadToS3 = async (path: string, imageFile: Buffer) => {
    try {

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: path,
            Body: imageFile
        }
        const data = await s3Client.send(new PutObjectCommand(uploadParams))

    } catch (error) {
        console.log(error)
    }
}

export default uploadToS3