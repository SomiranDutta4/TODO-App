const passport=require('passport')
const User=require('../models/todolistschema')
const LocalStrategy=require('passport-local').Strategy

passport.use(new LocalStrategy({
  usernameField:'email'},
    function(email, password, done) {
      User.findOne({ email: email }).then(user=>{
        if(!user){
          console.log('invalid email');
            return done(null,false)
        }else{
            if(user.password!=password){
                return done(null,false)
            }else{
                return done(null,user)
            }
        }
      }).catch(err=>{
        return done(err)
      })
    }
  ));
  

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then(user=>{
        return done(null,user)
    }).catch(err=>{
        return done(err)
  })
  });

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/SignIn')
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    return next()
}

module.exports=passport
