const db=require('../config/posttask');
const User=require('../models/todolistschema');


module.exports.servetask=function(req,res){
    User.findOne({email:req.user.email}).then(user=>{
        return res.render('ToDo',{'tasks':user.tasks});
    }).catch(error=>{
        console.log("error finding database");
        return;
    });
}
module.exports.posttask=function(req,res){
    User.findOne({email:req.user.email,password:req.user.password}).then(founduser=>{
        founduser.tasks.push({
            Description:req.body.Description,
            Category:req.body.selectedOpt,
            Date:req.body.date,
            isDone:false
        })
        founduser.save()
        return res.status(201).json(founduser.tasks[founduser.tasks.length-1])
    }).catch(err=>{
        return res.status(500).json(err)
    })
    // User.create({
    //     Description:req.body.Description,
    //     Category:req.body.selectedOpt,
    //     Date:req.body.date,
    //     isDone:false
    // }).then(createdtask=>{
    //     return res.status(201).json(createdtask)
    // }).catch(err=>{
    //     return res.status(500).json(err)
    // })
}
module.exports.changeDone=function(req,res){
    User.findOne({'tasks._id':req.body.id})
    .then(foundTask=>{
        if(foundTask.isDone==true){
            foundTask.isDone=false
        }else{
            foundTask.isDone=true
        }
        foundTask.save()

        return res.status(201).json({message:'successfully updated'})
    })
    .catch(err=>{
        return res.status(500).json({message:'server side error'})
    })
}

module.exports.deletetask=function(req,res){

    User.findOne({'_id':req.user._id}).then(done=>{
        if(done){
        let indexToRemove = done.tasks.findIndex(index => index._id == req.query.id);
        if(indexToRemove!=-1){
            done.tasks.splice(indexToRemove,1)
            done.save()
        }}else{
        }
        return res.status(300).json({message:'successfully deleted'}
        )
    }).catch(err=>{
        return res.status(401).json({message:'could not delete'})
    })
}