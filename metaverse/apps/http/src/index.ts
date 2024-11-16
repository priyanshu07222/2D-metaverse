import express from 'express'
import { router } from './routes/v1/index'
import client from '@repo/db/client'

const app = express()

app.use(express.json())

app.use('api/v1', router)

app.listen(process.env.PORT || 3000, () => {
    console.log("listeing at port 3000")
})