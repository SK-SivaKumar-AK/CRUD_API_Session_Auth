/* import package */
const bcrypt = require('bcryptjs');


/* File import */
const { userTable } = require('../models/user.model');
const { myEmitter } = require('../middleware/library.middleware');


/* Functions */
const registerUser = async (req , res) => {
    
    try {
        const {name , password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userTable({
            userName : name,
            userPassword : hashedPassword
        });
    
        const userCreated = await newUser.save();
        return res.status(200).json(userCreated);

    } catch (error) {

        const errorMessage = {
            message : error.message
        };
        return res.status(404).json(errorMessage);

    }  
};



const login = async (req , res) => {
    try {
        
        const {name , password} = req.body;
        const invalidResponseMessage = {
            message : 'Invalid credentials'
        };
        
        const loggedUser = await userTable.findOne({ userName : name });
        if (!loggedUser) {
            return res.status(400).json(invalidResponseMessage);
        }
        
        const loggedUserPassword = await bcrypt.compare(password, loggedUser.userPassword);
        if (!loggedUserPassword) {
            return res.status(400).json(invalidResponseMessage);
        }


        req.session.user = {
            userId : loggedUser._id,
            userName : loggedUser.userName
        };
        myEmitter.emit('logged', `Logged User : ${loggedUser._id} \t\t\t Time : ${new Date()}`);
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        
        const errorMessage = {
            message : error.message
        };
        return res.status(404).json(errorMessage);

    }
};


const logout = (req , res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
}



/* file export */
module.exports = {
    registerUser,
    login,
    logout
}