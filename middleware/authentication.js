const jwt=require('jsonwebtoken')
const env=require('dotenv').config()
const {User}=require('../models')

function authentication (req,res,next){
    console.log(req.headers.accesstoken)
    if(!req.headers.accesstoken){
        res.status(500).json({msg:"not authenticated 01"})
    }
    else{
        try{
            const compare=jwt.verify(req.headers.accesstoken,process.env.JWT_SECRET)

            User
        .findOne({where:{
            name:compare.name
        }})
        .then(user=>{
            if(!user){
                res.status(401).json('not authenticated user')
            }
            else{
                req.userLogin=user
                console.log(user)
                next()
            }
        })
        }catch(err){
            console.log(err)
            res.status(401).json({
                msg:'not authenticated'
            })
        }
    }
    // res.status(500).json({msg:"bntar.."})
}
module.exports=authentication