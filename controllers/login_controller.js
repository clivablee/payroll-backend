const {loginQuery} = require('../services/login_service')


module.exports = {

    loginAuth: (req, res) => {
        const body = req.body
        loginQuery(body, (err, result) => {
            if(err){
                res.status(400).json({
                    status: "Error",
                    message: "Database Error" + err,
                })
            }else{
                res.status(200).json({
                    status: "Success",
                    data: result
                })
            }
        })
            
    }

}