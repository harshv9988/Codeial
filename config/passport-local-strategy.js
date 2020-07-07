const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding user--->passport');
                return done(err);
            }

            if(!user || user.password!=password){
                console.log('invalid username password');
                return done(null,false);
            }

            return done(null,user);
        });
    }

));


//serializing the user to know which key is present in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})


//deserializing the user from the key in cookie
passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user--->deserialize');
            return done(err);
        }
        return done(null,user);
    });

});

module.exports = passport;