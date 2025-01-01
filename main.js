/* import package */
const express = require('express');
const session = require('express-session');
const mongoConnect = require('connect-mongo');
const dotEnv = require('dotenv');
const uuid = require('uuid').v4;


/* Initialize package */
const app = express();
dotEnv.config();


/* File import */
const { connectDB } = require('./database/db');
const { userRouter } = require('./routes/user.route');



/* middleware use */
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(session({
    secret : 'secret_key',
    resave : false,
    saveUninitialized : false,
    store : mongoConnect.create({
        mongoUrl : process.env.MONGODB_URI,
        collectionName : 'sessions'
    }),
    cookie: {
        maxAge: 2 * 60 * 1000,
    },
}));
app.use('/user' , userRouter);




/* server listen */
app.listen(3000 , (req , res) => {
    console.log(`Server is Running!`);
});
