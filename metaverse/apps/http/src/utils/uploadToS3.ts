import { PutObjectCommand } from "@aws-sdk/client-s3"
import s3Client from "./s3Connect"
import fs from 'fs'

const uploadToS3 = async (path: string, imageFile: string) => {
    // console.log(process.env.AWS_REGION!, process.env.AWS_ACCESSKEYID!, process.env.AWS_SECRETACCESSKEY!, "helop fhakl1111111")
    try {
        // console.log(process.env.AWS_REGION!, process.env.AWS_ACCESSKEYID!, process.env.AWS_SECRETACCESSKEY!, "helop fhakl")
        const bucketPath = path
        console.log("1")
        console.log(imageFile, "iamgefile")
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: bucketPath,
            Body: fs.readFileSync(imageFile)
        }
        console.log("12")


        const data = await s3Client.send(new PutObjectCommand(uploadParams))
        console.log("13")

        console.log("1111111", data)
    } catch (error) {
        console.log(error)
    }
}

export default uploadToS3