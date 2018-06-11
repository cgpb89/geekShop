var ObjectID = require('mongodb').ObjectID
const UserSchema = require('../models/userModel'),
    Helpers = require('../config/index'),
    RegisterAuth = require('../models/registerAuthModel');

module.exports = {
    signUp: async (req, res, next) => {
        console.log('signUp CALLED!!!');
        const { email, password } = req.value.body;

        //Check if there is a user with the same email
        const foundUser = await UserSchema.findOne({ "local.email": email });
        if (foundUser) {
            res.status(200).json({ 'Error': 'Email is already in use' });
        }
        //Create a newUser
        const newUser = new UserSchema({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        });
        await newUser.save();

        const token = Helpers.GeerateRandomKey();
        console.log('newUser.local._id', newUser.local.email);
        const result = await insertRegistroAuth(newUser.local.email, token);

        const returnObject = {
            token: token,
            id: newUser.local.email
        }
        console.log('result', result);
        if (result) {
            res.status(200).json({ returnObject });
        } else {
            return res.status(403).send({ error: 'Authentication error' });
        }
        //Respond with token
        //res.json({ user: 'Created' });
        //res.status(200).json({ token });
    },
    signIn: async (req, res, next) => {

        const userId = req.user.local.email
        const token = Helpers.GeerateRandomKey();//Generate token

        const deleted = await removeRegistroAuth(userId);
        console.log('deleted', deleted.ok);
        if(deleted.ok == 1){
            const result = await insertRegistroAuth(userId, token);

            const returnObject = {
                token: token,
                id: userId
            }
            res.status(200).json({ returnObject });
        }else{
            return res.status(403).send({ error: 'Authentication error' });
        }
    },

};

const removeRegistroAuth = async (pId) => {
    const result = await RegisterAuth.remove({ user: pId }, function (err, result) {
        if (err) {
            console.log('Error', err);
            return err;
        }
        else {
            return result;
        }
    });
    return result;
}

const insertRegistroAuth = async (pId, pToken) => {
    const newRegisterAuth = new RegisterAuth({
        user: pId,
        token: pToken
    });

    await newRegisterAuth.save();
    if (newRegisterAuth.err) {
        return false;
    } else {
        return true;
    }

}