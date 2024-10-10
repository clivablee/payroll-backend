const { getAllEmployees, selectEmployee, addEmployee } = require("../services/employees_service")

module.exports = {
    dataEmployees: (req, res) => {
            getAllEmployees((err, result) => {
                if (err) {
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

    dataSelectEmployees: (req, res) => {
        const body = req.body
        selectEmployee(body, (err, result) => {
            if (err) {
                res.status(400).json({
                    status: "Error",
                    message: "Database Error" + err,
                })
            }else{
                 if(result.length <= 0){
                     res.status(400).json({
                         status: "Error",
                         message: "No Data Found"
                     })
                 }else{
                    res.status(200).json({
                    status: "Success",
                    data: result
                })  
                 }
            }
        })
    },

    dataAddEmployees: (req, res) => {
        const body = req.body
        addEmployee(body, (err, result) => {
            if (err) {
                res.status(400).json({
                    status: "Error",
                    message: "Database Error" + err,
                })
            }else{
                selectEmployee(body, (err, select_result) => {
                    if (err) {
                        res.status(400).json({
                            status: "Error",
                            message: "Database Error" + err,
                        })
                    }else{
                        if(select_result.length > 0){
                            res.status(400).json({
                                status: "Error",
                                message: "Employee ID exists"
                            })
                        }else{
                            res.status(200).json({
                            status: "Success",
                            data: result
                            })
                        }
                    }   
                })
            }
        })
    }}