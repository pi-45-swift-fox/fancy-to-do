const {User}=require('../models')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

class Controller{
    static register(req,res){
        const encryptedPassword=bcrypt.hashSync(req.body.password,10)
        let obj={
           name:req.body.email,
           password:encryptedPassword
        }
        User.create(obj)
        .then(data=>{
            res.status(201).json({
                id:data.id,
                email:data.email,
                password:data.password
            })
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static async login(req,res,next){

        try{
            const userData = await User.findOne({
                                            where:{
                                                name:req.body.email,
                                            }
                                        })
            if(!userData){
                next({errorCode:'NOT_FOUND', message:`USER DOESN'T EXIST`})
            }
            else{
                //console.log(userData)
                    const verified=bcrypt.compareSync(req.body.password,userData.password)
                    if(verified){

                    const token=jwt.sign({name:userData.name},process.env.JWT_SECRET)
                    res.status(200).json({email:userData.name,token:token})
                    console.log('bener kok')
                    }
                    else{
                    res.status(401).json({massage:'Password is Incorrect'})
                    }

                }
        }catch(err){
            console.log(err)
         res.status(500).json({msg:'Error'})

        }
    }
}
module.exports=Controller