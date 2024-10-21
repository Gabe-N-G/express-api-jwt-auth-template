const  mongoose  = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    hashedPassword:{
        type: String,
        required: true
    }
})
userSchema.set('toJSON', { //when using to json, deleted the hashed password from the returned object key, still saved in database. 
    transform: (document,returnedObject) =>{ 
        delete returnedObject.hashedPassword;
    }
    
});


const User = mongoose.model('User', userSchema)
module.exports = User