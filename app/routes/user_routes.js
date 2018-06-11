const express = require('express'),
    router = require('express-promise-router')(),
    passport = require('passport'),
    passportConf = require('../passport');

const { validateBody, schemas } = require('../config/routesHelpers');
const UsersController = require('../controllers/user_controller');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), UsersController.signIn);

module.exports = router;
