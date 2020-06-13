const express=require('express');
const router=express.Router();
const passport=require('passport');

const postsCOntroller=require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postsCOntroller.create);
module.exports=router;