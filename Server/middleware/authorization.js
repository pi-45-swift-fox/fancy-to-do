const {Todo}=require('../models')
function authorization(req,res,next){
    Todo.findByPk(req.params.id)
    .then(data=>{
        console.log(data)
        if(data.UserId===req.userLogin.id){
            next()
        }
        else{
            return res.status(500).json({msg:`not authorized to see other's data`})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(404).json({msg:`Couldn't find your data`})
    })
    
    
}
module.exports=authorization