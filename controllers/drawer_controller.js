const { verifyToken } = require("../authentication/token_validation")



module.exports = {
    loggedInUser: (req,res) => {
        verifyToken (req, res, () => {
            res.status(200).json({
                status: "Success",
                data: req.user
            })
        })
    },
    loggedOutUser: (req, res) => {
        res.clearCookie("AuthToken", {
            httpOnly: true
        })
        res.status(200).json({
            status: "Success",
            message: "Logged Out"
        })
        
    }

}