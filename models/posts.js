const mongoose=require('mongoose');
const postsSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }}
    ,{
        timestamps:true
})

const Post=mongoose.model('Post',postsSchema);
module.exports=Post;