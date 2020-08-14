
class ThirdPartyController{
  static getUrl(req,res,next){
    const data = req.query.txt
    const qrCode = `http://api.qrserver.com/v1/create-qr-code/?data=${data}!&size=200x200`
    return res.status(200).json(qrCode)
  }
}

module.exports = ThirdPartyController