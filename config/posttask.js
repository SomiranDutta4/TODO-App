const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/todolist_db');

// const db=mongoose.connection;
// db.on('err',console.error.bind(console,"error setting up database"));
// db.once('open',function(){console.log('successfully connected to database')});

const uri=
'mongodb+srv://somirandutta46:l6kDDAYWkAePgA4V@cluster0.cgr8aoq.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(uri).then(result=>{
    console.log('mongoDB set up')
}).catch(err=>{
    console.log('error in DB connection:',err)
})