const cartRoutes = require('../controllers/cart_controller');

module.exports = function (app, db) {

/**********Initializing routes**********/
    //--Article Routes
    cartRoutes(app, db);

}