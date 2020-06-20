const User=require('../models/user');

// module.exports.profile=function(req,res){
//     if(req.cookies.user_id)
//     {
//         User.findById(req.cookies.user_id,function(err,user){
//             if(user)
//             {
//                 return res.render('users_profile',{
//                     title:"User Profile",
//                     user:user
//                 })
//             }
//             else{
//                 return res.redirect('/users/sign-in');
//             }
//         })
//     }
//     else{
//         return res.redirect('/users/sign-in');
//     }
// }
module.exports.profile=function(req,res){
      User.findById(req.params.id,function(err,user){
        return res.render('users_profile',{
            title:"User Profile",
            profile_user:user
        });
    });
}


module.exports.update=function(req,res){
    if(req.user.id==req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })

    }else{
        return res.status(401).send('Unauthorised');
    }
}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated())
    {
        res.redirect('/users/profile');
    }
    return res.render('user_sign_up',
    {
        title:"sign up"
    });
}
module.exports.signIn=function(req,res){

    if(req.isAuthenticated())
    {
        res.redirect('/users/profile');
    }

    return res.render('user_sign_in',
    {
        title:"sign in"
    });
}
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirmpwd)
    {
        return res.render('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('err in finding user in signing up');
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err)
                {console.log('err in creating user');return};

                return res.redirect('/users/sign-in');
                
            })
        }
    })

}
module.exports.login=function(req,res){
    // User.findOne({email:req.body.email},function(err,user)
    // {
    //     if(err){console.log('err in finding user in signing in');return;}
    //     if(user){
    //         if(user.password!=req.body.password)
    //         {
    //             return res.redirect('back');
    //         }
    //         res.cookie('user_id',user.id);
    //         return res.redirect('/users/profile');
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // })


    return res.redirect('/');
}
module.exports.destroySession=function(req,res)
{
    req.logout();
    return res.redirect('/');
}