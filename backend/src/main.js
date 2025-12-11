import express from 'express'
import dotenv from 'dotenv'
import { messageRouter } from './routes/message.route.js'
import { authRouter } from './routes/auth.route.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

app.use('/messages', messageRouter)
app.use('/auth', authRouter)

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

export default app
