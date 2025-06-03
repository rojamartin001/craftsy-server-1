const mongoose = require('mongoose')

const craftSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    materials:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    userId:{
        type: String,
        ref: "users", 
        required:true
    }
})

const crafts =mongoose.model("crafts",craftSchema)
module.exports = crafts