require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router= require('./routes/router')
require('./database/dbConnection')

const crServer = express()

crServer.use(cors())
crServer.use(express.json())
crServer.use(router)
crServer.use('/uploads',express.static('./uploads'))


const PORT = 3000 || process.env.PORT

crServer.listen(PORT,()=>{
    console.log(`my crServer is running in ${PORT} and waiting for client request`);
    
})

crServer.get('/',(req,res)=>{
    res.status(200).send('<h1>myy crServer is running in 3000 and waiting for client request</h1>')
})

crServer.post('/',(req,res)=>{
    res.status(200).send('post request')
})