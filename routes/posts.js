const express=require('express');
const router=express.Router();
const passport=require('passport');

const postsCOntroller=require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postsCOntroller.create);
router.get('/destroy/:id',passport.checkAuthentication,postsCOntroller.destroy);
module.exports=router;