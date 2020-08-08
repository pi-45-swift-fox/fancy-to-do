const {encode,decode} = require ('../helpers/jwt')
const {User,Todo} = require('../models')

const authentication = async(req,res,next)=>{
  const access_token = req.headers.access_token
  if(!access_token){
    return res.status(400).json({message:`Token not found`})
  }else{
    try {      
      const  userData = decode(access_token)
      req.userData = userData
      const user = await User.findOne({where:{email:userData.email}})
      if(user){
        next()
      }else{
        return res.status(401).json({message:"please login"})
      }
    } catch (error) {
      return res.status(500).json({message:"Internal Server Error"})
    }
  }
}
const authorization = async(req,res,next)=>{
  try {
    
    const idTodo = req.params.id
    const todo = await Todo.findOne({where:{id:idTodo}})
    if(todo.UserId === req.userData.id){
      next()
    }else{
      res.status(403).json({message:"Forbidden Acces"})
    }

  } catch (err) {
    res.status(500).json({message:'Internal Server Error'})
  }
}
module.exports = {authentication, authorization}