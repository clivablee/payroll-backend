const { query } = require("express")
const { getAllEmployees, selectEmployee, addEmployee, filterQuery, searchEmployeeQuery } = require("../services/employees_service")

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

    filterEmployees: (req, res) => {
        const body = { department, active_status} = req.query
        filterQuery(body, (err, result) => {
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

    searchEmployees: (req, res) => {
        const body = { employee_name, department, active_status } = req.query
        searchEmployeeQuery(body, (err, result) => {
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
        selectEmployee(body, (err, select_result) => {
            if(select_result.length >0){
                res.status(400).json({
                    status: "Error",
                    message: "Employee ID Already Exist"
                })
            }else{
                addEmployee(body, (err, result) => {
                    if (err) {
                        res.status(400).json({
                            status: "Error",
                            message: "Error in Database" + err
                        })
                    } else {
                        res.status(200).json({
                            status: "Success",
                            data: "Employee added succesfully"
                        })
                    }
                })
            }
        })
    }
}