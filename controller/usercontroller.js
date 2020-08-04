const {User}=require('../models')
const bcrypt=require('bcrypt');

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
    static login(req,res){
        User.findByPk({
            where:{
                name:req.body.email,
                password:req.body.password
            }
        })
        .then(data=>{
            res.send(200).json({user:data.user})
        })
        .catch(err=>{
            res.send(400).json(err)
        })
    }
}
module.exports=Controller