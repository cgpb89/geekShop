const Article = require('../models/articlesModel');

var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    //GET
    app.get('/articles/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }

        db.collection('articles').findOne(details, (err, item) => {
            if (err) {
                res.end({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.get('/articlesForCart/:articles', async (req, res) => {
        const listArticles = JSON.parse(req.params.articles);
        let listArtToSee = [];

        Article.find({
            '_id': { $in: listArticles}
        }, function(err, docs){
             console.log(docs);
             res.send(docs);
        });
    });
    //GET ALL
    app.get('/articles', (req, res) => {

        db.collection('articles').find({}).toArray((err, result) => {
            if (err) {
                res.end({ 'error': 'An error has occurred' });
            } else {
                res.send(result);
            }
        });
    });
    //DELETE 
    app.delete('/articles/:id', (req, res) => {
        console.log('req.params.id', req.params.id);
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('articles').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Article ' + id + ' deleted')
            }
        })
    })
    //POST
    app.post('/articles', (req, res) => {
        console.log('req.body', req.body);
        //console.log('req.body.name', req.body.name);
        //console.log('JSON', JSON.stringify(req.body).name);
        //console.log('JSON PARSE', JSON.parse(JSON.stringify(req.body)).name);
        const article = { name: req.body.name, price: req.body.price, brand: req.body.brand };
        db.collection('articles').insert(article, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' + err });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    //UPDATE
    app.put('/articles/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const article = { name: req.body.name, price: req.body.price, brand: req.body.brand };

        db.collection('articles').update(details, article, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' + err });
            } else {
                res.send(article);
            }
        })
    })
};