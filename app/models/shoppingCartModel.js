const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Create a Schema

const shoppingCart = new Schema({
    userId: {
        type: String,
        required: true
    },
    article: {
        articleId:{
            type:Number
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        },
        total: {
            type: Number
        }
    },


});

//Create a model
const Cart = mongoose.model('cart', shoppingCart);
//Export the model
module.exports = Cart;