const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Create a Schema

const article = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },



});

//Create a model
const Article = mongoose.model('article', article);
//Export the model
module.exports = Article;