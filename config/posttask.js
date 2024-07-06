const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/todolist_db');

// const db=mongoose.connection;
// db.on('err',console.error.bind(console,"error setting up database"));
// db.once('open',function(){console.log('successfully connected to database')});

const uri=
'mongodb+srv://{your database name}:{password }@cluster0.cgr8aoq.mongodb.net/shopping?retryWrites=true&w=majority&appName='
mongoose.connect(uri).then(result=>{
    console.log('mongoDB set up')
}).catch(err=>{
    console.log('error in DB connection:',err)
})
