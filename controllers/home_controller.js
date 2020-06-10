module.exports.home=function(req,res){
    return res.render('home',
    {
        title:"Home"
    });
}
//this code is accessible by router