const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codial_dev');

const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting mongoDB"));
db.once('open',function(){
    console.log('connected to DB');
});

module.exports=db;