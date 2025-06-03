const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING


mongoose.connect(connectionString).then(res=>{
    console.log("MongoDb atlas connected succesfully with pfserver");
    
}).catch(err=>{
    console.log("MongoDb atlas connection failed");
    console.log(err);
    
})