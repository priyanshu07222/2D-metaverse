import { S3Client, PutObjectCommand, CreateBucketCommand, DeleteBucketCommand, DeleteObjectCommand, GetObjectCommand, paginateListObjectsV2 } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
dotenv.config()


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID!,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY!
    }
})

export default s3Client;