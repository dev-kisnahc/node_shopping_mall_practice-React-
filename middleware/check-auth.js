
//로그인을 한 유저만 사용할 수 있도록 인증과정을 만듬

const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split("")[1]
        const decoded = jwt.verify(token, "secret")
        req.userdata = decoded
        next()
    }
    catch (err) {
        res.json({
            msg: "auth failed"
        })
    }
}