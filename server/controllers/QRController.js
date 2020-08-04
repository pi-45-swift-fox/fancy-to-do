class QR {
    static generateQR (req, res, next) {
        const { id } = req.params
        let qr = `http://api.qrserver.com/v1/create-qr-code/?data=${id}!&size=400x400`
        return res.status(200).json({ qr })
    }
}

module.exports = QR