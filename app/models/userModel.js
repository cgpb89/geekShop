const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

//Create a Schema

const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },

});

userSchema.pre('save', async function (next) {
    try {
        if(this.method!== 'local'){
            next();
        }
        //Generate salt
        const salt = await bcrypt.genSalt(10);
        //Generate a pass hash = salt + hash
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        //Re-assign hash version
        this.local.password = passwordHash;
        next();

    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

//Create a model
const User = mongoose.model('user', userSchema);
//Export the model
module.exports = User;