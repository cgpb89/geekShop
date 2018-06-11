const Cart = require('../models/shoppingCartModel');

var ObjectID = require('mongodb').ObjectID;

module.exports = async function (app, db) {
    //PUT
    app.put('/cart/:id', (req, res) => {

        const id = req.params.id;
        const pId = req.body.id;
        const cantidad = req.body.cantidad;

        const conditions = { '_id': id };
        const value = { 'stock': cantidad }

        console.log('req.body', req);
        console.log(conditions);
        console.log(value);

        Cart.update(conditions, value, { multi: true }, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' + err });
            } else {
                res.send(result);
            }
    
        });
    })
};

const updateStock = async (pCantidad, pArticleId) => {
    const conditions = { '_id': pId };
    const value = { 'stock': pCantidad }

    Cart.update(conditions, value, options, function (err, result) {
        if (err) {
            console.log('Error', err);
            return err;
        }
        else {
            console.log('result', result);
            return result;
        }

    });
}