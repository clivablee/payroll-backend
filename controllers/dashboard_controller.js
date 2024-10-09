
const {getBirthdays} = require('../services/dashboard_service')


module.exports = {
    dataBirthdays: (req, res) => {
        getBirthdays((err, result) => {
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