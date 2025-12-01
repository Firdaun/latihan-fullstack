import express from 'express';
import dotenv from 'dotenv';
import { messageRouter } from './routes/message.route.js';

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use('/messages', messageRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

export default app
