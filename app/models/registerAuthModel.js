const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Create a Schema

const registerAuth = new Schema({
    user: {
        type: String,
        lowercase: true
    },
    token: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }

});
//Create a model
const RegisterAuth = mongoose.model('registerAuth', registerAuth);
//Export the model
module.exports = RegisterAuth;