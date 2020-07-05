const User = require('../models/user');

module.exports.profile = function(req,res){  //can't go to profile directly
    // console.log('id',req.cookie.user_id)
  if(req.cookies.user_id){        //if cookie found
    User.findById(req.cookies.user_id,function(err,user){
        if(err){
            console.log('error in finding cookie for signup');
            return;
        }

        if(user){
        return res.render('user_profile',{
            title : 'profile',
            user : user
        });
       }
       else{
           return res.redirect('/users/sign-in');
       }
    });
  }
  else{
    return res.redirect('/users/sign-in');
  }
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title : "Codeial : Sign Up"
    });
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title : "Codeial : Sign In"
    });
}

module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user for signup');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user for signup');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });

}

module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user for signup');
            return;
        }

        //user found
        if(user){
            //wrong password
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            //handle session
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            //no user found
            return res.redirect('back');
        }
    });
    
}