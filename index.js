const port=800;
const flash=require('connect-flash')
const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
app.use(express.static('assets'));
app.set('views','./views');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(flash())
var session = require('express-session');
const passport =require('passport');
const passportLocal=require('./config/passport-local');
const MongoStore = require('connect-mongo');
app.use(cookieParser());
const uri='mongodb+srv://somirandutta46:l6kDDAYWkAePgA4V@cluster0.cgr8aoq.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0'


app.use(session({
    name:'secretKey',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:(1000*60*200)
},
store:MongoStore.create({
    mongoUrl:uri,
    autoRemove:'disabled'
    // autoRemoveInterval:'100'//in minutes default

},function(err){
    console.log(err)
})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){console.log("error setting up sever");
        return
    }else{
        console.log("successfully set up server with port:",port);
    }
})