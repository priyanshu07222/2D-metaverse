import express from 'express'
import { router } from './routes/v1/index'
import client from '@repo/db/client'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()

dotenv.config()

app.use(express.json())
app.use(cors({}))

app.use('/api/v1', router)

app.listen(process.env.PORT || 3000, () => {
    console.log("listeing at port 3000")
})