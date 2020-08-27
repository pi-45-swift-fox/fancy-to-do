const axios = require('axios');

class thirdParty {
    static getRecipe(req, res, next) {
        axios({
                method: 'get',
                url: 'http://www.recipepuppy.com/api/',
                params: {
                    q: req.body.recipeRequested
                }
            })
            .then(result => {
                let listRecipe = []
                result.data.results.forEach(el => {
                    listRecipe.push(el)
                });
                res.status(200).json(listRecipe)
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }
}

module.exports = thirdParty