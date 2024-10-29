const {loginQuery} = require('../services/login_service')
const jwt = require('jsonwebtoken')

module.exports = {

    loginAuth: (req, res) => {
        const body = req.body
        loginQuery(body, (err, result) => {
            if(err){
                res.status(400).json({
                    status: "Error",
                    message: "Database Error" + err,
                })
            }
                if(result.length <= 0){
                    res.status(400).json({
                        status: "Error",
                        message: "No Data Found"
                    })
                }else{
                    const token = jwt.sign( { 
                        emp_id: result[0].emp_id, 
                        emp_name: result[0].employee_name, 
                        job_title: result[0].job_title,
                        access_rights: result[0].access_rights}, process.env.SECRET_KEY, {expiresIn: "1h"})

                    res.cookie("AuthToken", token, {   //create cookie
                        httpOnly: true,
                    })
                        
                    res.status(200).json({
                        status: "Success",
                        data: result,
                    })
                }
            }
    )}

}