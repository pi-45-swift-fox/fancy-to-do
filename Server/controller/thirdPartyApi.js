const axios = require('axios')

class PartyApi{
    static anime(req,res, next){
        axios({
            method: 'get',
            url: 'https://ghibliapi.herokuapp.com/species',
            params: {
                name: 'Spirit',
            }
        })
        .then(response=>{
            res.status(200).json(response.data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = PartyApi