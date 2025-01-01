/* import package */
const mongoose = require('mongoose');


/* create table structure */
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        unique : true,
        required : true 
    },
    userPassword : {
        type : String,
        required : true,
    }
});


/* create table */
const userTable = mongoose.model('user' , userSchema);


/* File export */
module.exports = {
    userTable
}