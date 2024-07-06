const passport = require('passport');
const User=require('../models/todolistschema')
const { validationResult } = require('express-validator');

module.exports.signinReq=function(req,res){

    let error=req.flash('error')
    if(error.length>0){
        error=error[0]
    }else{
        error=null
    }
    return res.render('Signin',{'error':error})
}
module.exports.signupReq=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
        }
    let error=req.flash('error')
    if(error.length>0){
        error=error[0]
    }else{
        error=null
    }
return res.render('SignUp',{'error':error})
}

module.exports.CompleteSignup=function(req,res){
    let errors=validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error','Email should be Valid, and also password should be longer')
        return res.redirect('back')
      }

    User.create({
        email:req.body.email,
        password:req.body.password,
        tasks:[]
    }).then(done=>{
        return res.redirect('/SignIn')
    }).catch(err=>{
        return res.status(500).redirect('back')
    })
}
module.exports.CompleteSignin=function(req,res){

    return res.redirect('/')
}

module.exports.logout=function(req,res){
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/signin')
    })
}