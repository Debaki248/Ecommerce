
const mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },


},{
    timeStamps:true
})
module.exports = mongoose.model('category',categorySchema);

/*
const mongoose = require('mongoose');
var staffSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
mongoose.model('staff',staffSchema);
*/