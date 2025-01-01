/* import package */
const express = require('express');



/* Initialize package */
const userRouter = express.Router();



/* File import */
const { registerUser , login , logout } = require('../controllers/user.controller');
const { loginCheck } = require('../middleware/library.middleware');


/* Routers */
userRouter.post('/registerUser' , registerUser);
userRouter.get('/login'  , loginCheck , login);
userRouter.get('/logout'  , logout);





/* file export */
module.exports = {
    userRouter
}