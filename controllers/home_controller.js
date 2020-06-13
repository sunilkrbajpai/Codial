const Post=require('../models/posts');

module.exports.home=function(req,res){
    
    
//     Post.find({},function(err,posts){

//         return res.render('home',
//     {
//         title:"Codial | Home",
//         posts:posts
//     });
// });

Post.find({}).populate('user').exec(function(err,posts){

    if(err){console.log(err)};
    return res.render('home',
{
    title:"Codial | Home",
    posts:posts
});
});
}
//this code is accessible by router