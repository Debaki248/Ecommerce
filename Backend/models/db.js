const mongoose = require('mongoose');
const conn = mongoose.connect('mongodb://localhost:27017/Ecommerce');
if(conn){
    console.log("mongodb connected")
}else{
    console.log("mongodb not connected");
}