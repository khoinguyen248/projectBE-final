import express from 'express'
import connectData from './src/database/index.js'
import Root from './src/router/index.js'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors());
connectData()

app.use(Root)


app.listen(8080, () => {
    console.log('Server is on')
})