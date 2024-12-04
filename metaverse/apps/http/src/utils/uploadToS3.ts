import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import s3Client from "./s3Connect"
import fs from 'fs'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const BucketName = process.env.AWS_BUCKET_NAME!
// const uploadToS3 = async (path: string, imageFile: Buffer) => {
//     try {

//         const uploadParams = {
//             Bucket: BucketName,
//             Key: path,
//             Body: imageFile
//         }
//         const data = await s3Client.send(new PutObjectCommand(uploadParams))

//     } catch (error) {
//         console.log(error)
//     }
// }

// const putObjects = async (path: string, imageFile: Buffer) => {
//     try {

//         const uploadParams = {
//             Bucket: BucketName,
//             Key: path,
//             Body: imageFile
//         }
//         // const url = await getSignedUrl(s3Client, uploadParams)
//         const data = await s3Client.send(new PutObjectCommand(uploadParams))

//     } catch (error) {
//         console.log(error)
//     }
// }

// export const getObjectUrl = async (key: any) => {
//     const command = new GetObjectCommand({
//         Bucket: BucketName,
//         Key: key
//     })

//     const url = await getSignedUrl(s3Client, command)
//     return url;
// }

// export default uploadToS3