const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    MongoClient = require('mongodb').MongoClient,
    db = require('./app/config/db');

//

const app = express();

const port = 3001;
mongoose.connect(db.url);

//Middleware
app.use(bodyParser.json());
//Another way to comunicate and treat mondoDB and mongoose
MongoClient.connect(db.url, (err, database) => {
    require('./app/routes/index')(app, database);
    require('./app/routes/cart_routes')(app, database);
});



//Routes
app.use('/users',require('./app/routes/user_routes'));
//Start Server
app.listen(port);

console.log('Listening on port 3001')
