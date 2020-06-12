const express =require('express');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');
const passport=require('passport')
const session=require('express-session')
const passportLocal=require('./config/passport-local-strategy')
const app=express();
const port=8000;
app.use(express.static('./assets'));
const mongoStore=require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
//extract style and scruipts from sub pages
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

//mongo store used to store seesion cookie
app.use(session({
    name:'codeial',
    secret:'vlah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err)
    {
        console.log(err || 'connect mongo setup ok');
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateUser);
//use express router
app.use('/',require('./routes'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running Server :${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});