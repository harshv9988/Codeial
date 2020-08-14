const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('Inside newComment mailer',comment);

    nodeMailer.transporter.sendMail({
        from : 'harshv521@gmail.com',
        to : comment.user.email,
        subject : 'New Comment',
        html : '<h1> Hey your Comment is published </h1>'
    }, (err,info) => {
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message Sent',info);
        return;
    });
}