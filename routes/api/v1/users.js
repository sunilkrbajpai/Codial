const express=require('express');
const router=express.Router();
const usersAPi=require('../../../controllers/api/v1/users_api');

router.post('/create-session',usersAPi.login);
module.exports=router;