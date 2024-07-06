const mongoose=require('mongoose');
let todotasks=new mongoose.Schema({
    Description:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean
    },
});

const user=new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    tasks:[todotasks]
})

const Users=mongoose.model('user',user)
module.exports=Users

// const Tasks=mongoose.model('Tasks',todotasks);
// module.exports=Tasks;
