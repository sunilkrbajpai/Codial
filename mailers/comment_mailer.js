const nodemailer=require('../config/nodemailer');

//this is another way of exporting
exports.newComment=(comment)=>{
    // console.log('Inside newComment mailer',comment);
    let htmlString=nodemailer.renderTemplate({comment:comment},'./comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from:'codial.com',
        to:comment.user.email,
        subject:"New Comment Published!",
        html:htmlString
    },(err,info)=>{
        if(err){
        console.log('error in sending mail',err);
        return;
    }

    console.log('Message sent',info);
    return;
    })
}