//
const app = require('express');
const express = app();
require('./models/db');
//const jwt = require('../Backend/helpers/jwt');
const bodyParser = require('body-parser');
//middleware
express.use(bodyParser.json());
//express.use(jwt);
const routes = require('../Backend/router/routes');

//express.use('/staff',routes);
express.use('/product',routes);
express.use('/category',routes);
express.use('/users',routes);


express.listen(9000,()=>{
    console.log('server created');
})