const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                status: "Error",
                message: "No token provided"
            })
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded)
            req.user = decoded
            next()
        } catch (err) {
            console.log("Error" + err)
            return res.status(401).json({
                status: "Error",
                message: "Invalid or expired token"
            })
        }
    }

}
    