/* import package */
const eventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const fspromises = require('fs').promises;

/* Initialize package */
const myEmitter = new eventEmitter();





const loginCheck = async (req , res , next) => {
    if (!req.session.user ) {
        next();
    } else {
        const validResponseMessage = {
            message : 'Already LoggedIn...!'
        };
        return res.status(200).json(validResponseMessage);
    }
};

const loggedData = async (message) => {
    try {
        if(!fs.existsSync(path.join(__dirname , '..' , 'logs'))){
            await fspromises.mkdir(path.join(__dirname , '..' , 'logs'));
        }
        await fspromises.appendFile(path.join(__dirname , '..' , 'logs' , 'logFile.txt') , message);
    } catch (error) {
        console.log(error.message);
    }
}






/* Emitter triggred */
myEmitter.on('logged', (data) => {
    loggedData(data);
});



/* file export */
module.exports = {
    loginCheck,
    myEmitter
}