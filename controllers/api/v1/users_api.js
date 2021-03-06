const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.login=async function(req,res)
{
    try{
        let user=await User.findOne({email:req.body.email});


        if(!user || user.password!= req.body.password){
            return res.json(422,{
                message:'Invalid username or password'
            })
        }

        return res.json(200,{
            message:'Signed in successfully, token generated',
            data:{
                token:jwt.sign(user.toJSON(),'codial',{expiresIn:'1000000'})
            }
        })
    }
    catch(err)
    {
        console.log('****************',err);
        return res.json(500,{
            message:'Internal Error'
        })
    }
}