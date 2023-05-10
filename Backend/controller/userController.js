require('../models/products');
require('../models/user');
const env = require('../environment');
const mongoose = require('mongoose');
const category = require('../models/category');
const { route } = require('../router/routes');
const product = mongoose.model('products');
const user = mongoose.model('user');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const http = require('http');
const { access } = require('fs');
//products
module.exports.productsGet = async(req,res)=>{
    console.log("inside productsGet");
    /*
    const counts = req.params.count;
    console.log("counts = ",counts);
    if(!counts){
        count=0;
    }
    console.log("inside productsGet");
    console.log("product params = ",req.query.product);
    let filter = {};
   // console.log("category id passing in the query",req.query.product);
    if(req.query.product){
        filter = {product: req.query.product.split(',')}
    }
    console.log("filter = ",filter);
    */
    const updatedProducts = await product.find();
   // console.log(updatedProducts);
    if(updatedProducts){
        res.status(200).json(updatedProducts);
    }else{
        res.status(500).json("Error");
    }
}
module.exports.productsPost = async(req,res)=>{
    console.log("inside productsPost()");
    const productList = new product();
    productList.name = req.body.name,
    productList.email = req.body.email,
    productList.description = req.body.description,
    productList.richDescription =req.body.richDescription,
    productList.image = req.body.image,
    productList.images = req.body.images,
    productList.brand = req.body.brand,
    productList.price = req.body.price,
    productList.categoryID = req.body.category,
    productList.countInStock = req.body.countInStock,
    productList.rating = req.body.rating,
    productList.isFeatured = req.body.isFeatured,
    productList.dateCreated = req.body.dateCreated

    if(productList){
        res.status(200).json(productList);
    }else{
        res.status(500).json("Error");
    }
    await productList.save();
}
module.exports.productsPut = async(req,res)=>{
    console.log("inside productsPut");
    const updatedProductlist = await product.findByIdAndUpdate(req.params.id,{
        name :req.body.name,
        email :req.body.email,
        description : req.body.description,
        richDescription :req.body.richDescription,
        image : req.body.image,
        images : req.body.images,
        brand : req.body.brand,
        price : req.body.price,
        categoryID : req.body.category,
        countInStock : req.body.countInStock,
        rating : req.body.rating,
        isFeatured : req.body.isFeatured,
        dateCreated : req.body.dateCreated

    })
    if(updatedProductlist){
        console.log("inside updatedProductlist");
        res.status(200).send(updatedProductlist);
    }else{
        res.status(404).send("error in manipulating data")
    }
    await updatedProductlist.save();
}
module.exports.productsDelete = async(req,res)=>{
    console.log("inside productsDelete()");
    const deletedProducts = product.findByIdAndRemove(req.params.id).then(products=>{
        console.log(products);
        if(products){
            res.status(200).json("deleteed Sucessfully")
        }else{
            res.send("id is not present")
        }
    }).catch(err=>{
        res.send(err);
    })
    
    
}

//category
module.exports.categoryPost = async(req,res)=>{
    console.log("inside categoryPost()");
    console.log('requeest body => ',req.body);
    var categoryList = new category();
    categoryList.name = req.body.name,
    categoryList.color = req.body.color,
    categoryList.icon = req.body.icon,
    categoryList.image = req.body.image

    if(categoryList){
        res.status(200).json(categoryList);
    }else{
        res.status(500).json("Error")
    }
    await categoryList.save();
}
module.exports.categoryGet = async(req,res) => {
    console.log("inside categoryGet");
    const categoriesList = await category.find();
    console.log(categoriesList);
    if(categoriesList){
        res.status(200).status(categoriesList);
    }else{
        res.status(404).status("could not find it in the category collection");
    }
}

//user

module.exports.postUsers = async(req,res)=> {
    let access;
    console.log("inside postUsers");
      const userDetails = await user.findOne({email:req.body.email});
    const secret = env.secretKey;
     console.log(secret);
    /*
    if(!userDetails){
        res.status(404).json("not found email")
    }else{
        res.status(200).json(userDetails);
    }
    */
   /*
   console.log(req.body.passwordHash);
    console.log(bcrypt.compareSync(req.body.passwordHash,userDetails.passwordHash));
    if(userDetails && bcrypt.compareSync(req.body.passwordHash,userDetails.passwordHash)){
        const token = jsonWebToken.sign(
            {
                userId:userDetails.id,
                isAdmin:userDetails.isAdmin
            },
            secret,
            {
                expiresIn:'1d'
            }
        )
        res.status(200).json({user: user.email,token:token});
    }else{
        res.status(400).json("invalid token");
    }
    */
   
  /*
  console.log("passwordHash = ",req.body.passwordHash);
    const users = new user();
    users.name = req.body.name,
    users.email = req.body.email,
    users.passwordHash = bcrypt.hashSync(req.body.passwordHash,10),
    users.street = req.body.street,
    users.apartment = req.body.apartment,
    users.city = req.body.city,
    users.zip = req.body.zip,
    users.country = req.body.country,
    users.phone = req.body.phone,
    users.isAdmin = req.body.isAdmin

    if(users){
        res.status(200).json(users);
    }else{
        res.status(500).json("Error")
    }
    users.save();
    */
    console.log("before passing to isRevoked()",userDetails.isAdmin);
    access  = isRevoked(userDetails.isAdmin);
    console.log("access = ",access);
    if(access){
     res.status(200).json(userDetails);
    }else{
     res.status(403).json("user is not admin");
    }
}

module.exports.getUser = async(req,res)=>{
    console.log("inside getUser()");
    const users = await user.find();
    if(users){
        res.status(200).json(users);
    }else{
        res.status(404).json("Error in finding users");
    }
    users.save();
}

module.exports.updateUserData = async(req,res)=>{
    console.log("inside updateUserData()");

    const userExist = await user.findById(req.params.id);
    /*
    let newPassword;
    console.log("passsword => ",req.body.passwordHash);
    const password = req.body.passwordHash;
    if(req.body.passwordHash){
        const passswordLength = password.length;
        console.log("passwordLenght = ",passswordLength);
    }else{
        passswordLength = -1;
    }

    if(passswordLength>-1 && req.body.passwordHash){
        console.log("password is present");
        newPassword = bcrypt.hashSync(req.body.passwordHash);
    }
    else {
        console.log("password is not passed");
       newPassword = bcrypt.hashSync(userExist.passwordHash);
    }
    console.log("newPassword = ",newPassword);
    console.log("inside updateUserData");
    console.log(req.params.id)
    */
    const newUser = await user.findByIdAndUpdate(
        req.params.id,{
        name : req.body.name,
        email : req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash,10),
        street : req.body.street,
        apartment : req.body.apartment,
        city : req.body.city,
        zip : req.body.zip,
        country : req.body.country,
        phone : req.body.phone,
        isAdmin : req.body.isAdmin

        }
    )
    if(newUser){
        res.status(200).json(newUser);
    }else{
        res.status(404).json("Error in finding userid")
    }
    
}
module.exports.verifyToken = async(req,res)=>{
    console.log("inside verifyToken");
    bearerHeader = req.headers['authorization'];
    console.log("bearerHeader = ",bearerHeader);
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    console.log("token = ",token);
    jsonWebToken.verify(token,env.secretKey,(err,authdata)=>{
        if(err){
            res.send({result:"Invalid Token"})
        }else{
            res.status(200).json(authdata);
        }
    })
    /*
    */
    /*
    if(typeof bearerHeader !== 'undefined'){
       const bearer = bearerHeader.split(" ");
         console.log("bearer = ",bearer);
        const token = bearer[0];
        console.log("token = ",token);
        console.log("secretkey => ",env.secretKey);
        jsonWebToken.verify(token,env.secretKey,(err)=>{
            if(err){
                res.send("Invalid Token");
            }else{
                res.send("profile accessed");
            }
        })
    }else{
        res.send({result:'token is not valid'});
    }
    */
}
function isRevoked(payload){
    if(payload){
        return true;
    }else{
        return false;
    }

}