const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/userModel');

    //LOCAL Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        console.log('entra passport');
        //Find the user given the email
        const user = await User.findOne({ "local.email": email });
        //If not, handle it
        if (!user) {
            return done(null, false);
        }
        //Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        //If not, handle it
        if (!isMatch) {
            return done(null, false);
        }
        //Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));