const{User}=require('../models')

function isUniqueEmail(req,res,next){
    let obj={
        name:req.body.email
    }
    User.findOne({where:obj})
    .then(data=>{
        if(!data){
            next()
        }
        else{
            res.status(500).json({massage:'Email already registered'})
        }
    })
}
module.exports=isUniqueEmail