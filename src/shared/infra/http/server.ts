import express from 'express';
import routes from '@shared/infra/http/routes/index';
import {createConnection} from '@config/database'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

createConnection()
app.listen(3333, () => {
    console.log("server Online 🚀")
})
