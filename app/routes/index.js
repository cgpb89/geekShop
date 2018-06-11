const articleRoutes = require('./article_routes');

module.exports = function (app, db) {

/**********Initializing routes**********/
    //--Article Routes
    articleRoutes(app, db);

}