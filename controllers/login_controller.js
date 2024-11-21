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
                } else {
                    const token = jwt.sign({ 

                        emp_name: result[0].employee_name, 
                        
                        
                        //profile tab
                        first_name: result[0].first_name, 
                        middle_name: result[0].middle_name, 
                        last_name: result[0].last_name, 
                        mobile_number: result[0].mobile_number, 
                        address: result[0].address, 
                        civil_status: result[0].civil_status, 
                        gender: result[0].gender, 
                        personal_email: result[0].personal_email, 
                        date_of_birth: result[0].date_of_birth, 
                        emergency_person: result[0].emergency_person, 
                        emergency_number: result[0].emergency_number, 

                        //work tab
                        emp_id: result[0].emp_id, 
                        job_title: result[0].job_title,
                        salary: result[0].salary, 
                        employment_status: result[0].employment_status,
                        employee_type: result[0].employee_type,
                        employee_level: result[0].employee_level,
                        email_work: result[0].email_work,
                        assigned_branch: result[0].assigned_branch,
                        assigned_city: result[0].assigned_city,
                        department: result[0].department,
                        hired_date: result[0].hired_date,
                        third_date: result[0].third_date,
                        fifth_date: result[0].fifth_date,
                        regularization_date: result[0].regularization_date,

                        
                        sss_no: result[0].sss_no,
                        tin_no: result[0].tin_no,
                        hdmf_no: result[0].hdmf_no,
                        philhealth_no: result[0].philhealth_no,
                        active_status: result[0].active_status,
                        access_rights: result[0].access_rights,
                        password: result[0].password,
                        separation_cause: result[0].separation_cause,
                        separation_date: result[0].separation_date,
                        separation_type: result[0].separation_type,
                        eligibility: result[0].eligibility,
                        clearance: result[0].eligibility,
                        hmo_deduction_type: result[0].hmo_deduction_type,
                    }, 
                        process.env.SECRET_KEY, {expiresIn: "1h"})

                    res.cookie("token", token, {   //create cookie
                        httpOnly: true,
                        sameSite: "None",
                        secure: true
                    })
                    res.status(200).json({
                        status: "Success",
                    })
                }
            }
    )}

}