const Post=require('../models/posts');
const User=require('../models/user');
module.exports.home=async function(req,res){
    
    
//     Post.find({},function(err,posts){

//         return res.render('home',                demo
//     {
//         title:"Codial | Home",
//         posts:posts
//     });
// });

// Post.find({})
// .populate('user')
// .populate({
//     path:'comments',
//     populate:{
//         path:'user'
//     }
// })                                                               working
// .exec(function(err,posts){

//     // if(err){console.log(err)};

//     User.find({},function(err,users){
//         return res.render('home',
//         {
//             title:"Codial | Home",
//             posts:posts,
//             all_users:users
//         });
//     })

// });

try{
    let posts=await Post.find({})
    .sort('-createdAt')
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user'
    }
})

let users=await User.find({});

return res.render('home',
        {
            title:"Codial | Home",
            posts:posts,
            all_users:users
        });

}
catch(err){
    console.log('Error',err);
    return;
}


}
//this code is accessible by router