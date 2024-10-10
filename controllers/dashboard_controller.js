
const {getBirthdays, getYearsOfService} = require('../services/dashboard_service')


module.exports = {
    dataBirthdays: (req, res) => {  //birthday celebrants
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
    },
    dataYearsOfService: (req, res) => {     //years of service (anniversary)
        getYearsOfService((err, result) => {
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