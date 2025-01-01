/* import package */
const express = require('express');



/* Initialize package */
const userRouter = express.Router();



/* File import */
const { registerUser , login } = require('../controllers/user.controller');
const { loginCheck } = require('../middleware/library.middleware');


/* Routers */
userRouter.post('/registerUser' , registerUser);
userRouter.get('/login'  , loginCheck , login);





/* file export */
module.exports = {
    userRouter
}