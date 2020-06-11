module.exports.profile=function(req,res){
    return res.render('users_profile',
    {
        title:"Users Profile"
    });
}
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',
    {
        title:"sign up"
    });
}
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',
    {
        title:"sign in"
    });
}
