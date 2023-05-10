const appNew = require('express');
const mongoose = require('mongoose');
const router = appNew.Router();
require('../models/products');
require('../models/category');
const category = mongoose.model('category');
const product = mongoose.model('products');
const controller = require('../controller/userController')
router.get("/getProducts",controller.productsGet);
router.get("/categoriesGet",controller.categoryGet);
//router.get("/getUsers",controller.getUser)
router.post('/categoriesPost',controller.categoryPost);
router.post('/productsPost',controller.productsPost);
router.post('/postUsers/login',controller.postUsers);
router.post("/profile",controller.verifyToken);
router.put('/:id',controller.productsPut);
router.put('/postUser/:id',controller.updateUserData);
router.delete('/:id',controller.productsDelete);
module.exports = router;
