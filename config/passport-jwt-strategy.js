const passport=require('passport');
const Jwtstrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

const User=require('../models/user');
let opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
}

passport.use(new Jwtstrategy(opts,function(jwtpayload,done)
{

    User.findById(jwtpayload._id,function(err,user)
    {
        if(err)
        {console.log('Error in finding the user');return;}

        if(user)
        {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}))

module.exports=passport;