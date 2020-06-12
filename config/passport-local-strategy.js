const passport =require('passport');
const localStrategy=require('passport-local').Strategy;
const user=require('../models/user');
passport.use(new localStrategy({
    usernameField:'email'
},
function(email,password,done)
{
    //find a user and establish identity
    user.findOne({
        email:email
    },function(err,user)
    {
        if(err){console.log('error in finding user ----> passport');return done(err)}
        if(!user || user.password!=password)
        {
            console.log('error username/pasword')
            return done(null,false)
        }
        return done(null,user);
    })
}

));

//serualising the user which key is kept in the cookies
passport.serializeUser(function(user,done)
{
    done(null,user.id);
})

//deserialise user
passport.deserializeUser(function(id,done)
{
    user.findById(id,function(err,user)
    {
        if(err){
            console.log('error in findinf user');
            return done(err);
        }
        return done(null,user);
    })
})

//check if user is authenticated
passport.checkAuthentication=function(req,res,next)
{
    //if user is sign in
    if(req.isAuthenticated())
    {
        return next();
    }
    //of user is not singed in
    return res.redirect('/users/sign-in');
}
//check if user is authenticated
passport.setAuthenticateUser=function(req,res,next)
{
    //if user is sign in
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;