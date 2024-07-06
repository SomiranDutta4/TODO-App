const express=require('express');
const mainroute=express.Router();
console.log("router is set");
const controller=require('../controllers/todocontroller');
const signCont=require('../controllers/signin_signup')
const { body } = require('express-validator');
const passportLocal=require('../config/passport-local')
const passport = require('passport');

mainroute.get('/',passportLocal.checkAuthentication,controller.servetask);
mainroute.post('/create/task',passportLocal.checkAuthentication,controller.posttask);
mainroute.patch('/change/tick',passportLocal.checkAuthentication,controller.changeDone)
mainroute.delete('/delete/task/',passportLocal.checkAuthentication,controller.deletetask)

mainroute.get('/SignUp',signCont.signupReq)
mainroute.get('/SignIn',signCont.signinReq)
mainroute.post('/logout',signCont.logout)

mainroute.post('/SignIn',
    body('email').isEmail(),
    body('password').isLength({min:1}),
    passport.authenticate('local', { 
        failureFlash:('Please enter correct email and passord'),
        failureRedirect: '/SignIn' }),
    signCont.CompleteSignin);

mainroute.post('/SignUp',signCont.CompleteSignup)


module.exports=mainroute;