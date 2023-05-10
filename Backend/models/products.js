const mongoose = require('mongoose');
require('../models/category');
var userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    images:[{
        type:String,
        default:""
    }],
    brand:{
        type:String,
        default:""
    },
    price:{
        type:Number,
        default:0
    },
    categoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
},{
    timeStamps:true
});
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON',{
    virtuals:true,
});
mongoose.model('products',userSchema);


/*
const mongoose = require('mongoose');
var rights = mongoose.Schema({
    staff_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'staff'
    },
    right:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
mongoose.model('right',rights)
*/