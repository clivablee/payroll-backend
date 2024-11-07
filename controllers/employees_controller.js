const { query } = require("express")
const { getAllEmployees, selectEmployee, addEmployee, filterQuery, searchEmployeeQuery } = require("../services/employees_service")

class EmployeeController {
    async index(req, res) { 
        try {
            const response = await getAllEmployees()
            return res.status(200).json({
                status: "success",
                data: response
            })
        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: error
            })
        }
    }
    async select(req,res) {
        try {
            const response = await selectEmployee(req.params.emp_id)
            if(response.length == 0){
                return res.status(404).json({
                    status: "No Employee ID found",
                    data: response
                })
            }
            else{
                return res.status(200).json({
                    status: "success",
                    data: response
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: error
            })
        }
    }

    async filter(req,res) {
        try {
            const response = await filterQuery(req.query)
            return res.status(200).json({
                status: "success",
                data: response
            })
        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: error
            })
        }
    }
}

module.exports = {
    EmployeeController
}

// module.exports = {
//     dataEmployees: (req, res) => {
//             getAllEmployees((err, result) => {
//                 if (err) {
//                     res.status(400).json({
//                         status: "Error",
//                         message: "Database Error" + err,
//                     })
//                 }else{
//                     res.status(200).json({
//                         status: "success",
//                         data: result
//                     })
//                 }
//             })
//     },

//     filterEmployees: (req, res) => {
//         const body = { department, active_status} = req.query
//         filterQuery(body, (err, result) => {
//             if (err) {  
//                 res.status(400).json({
//                     status: "Error",
//                     message: "Database Error" + err,
//                 })
//             }else{
//                 res.status(200).json({
//                     status: "success",
//                     data: result
//                 })
//             }
//         })
//     },

//     searchEmployees: (req, res) => {
//         const body = { employee_name, department, active_status } = req.query
//         searchEmployeeQuery(body, (err, result) => {
//             if (err) {
//                 res.status(400).json({
//                     status: "Error",
//                     message: "Database Error" + err,
//                 })
//             }else{
//                res.status(200).json({
//                    status: "success",
//                    data: result
//                })
//             }
//         })
//     },

//     dataSelectEmployees: (req, res) => {
//         const body = req.params.id
//         selectEmployee(req.params.id, (err, result) => {
//             if (err) {
//                 res.status(400).json({
//                     status: "Error",
//                     message: "Database Error" + err,
//                 })
//             }else{
//                  if(result.length <= 0){
//                      res.status(400).json({
//                          status: "Error",
//                          message: "No Data Found"
//                      })
//                  }else{
//                     res.status(200).json({
//                     status: "success",
//                     data: result
//                 })  
                
//                 }
//             }
//         })
//     },

//     dataAddEmployees: (req, res) => {
//         const body = req.body
//         selectEmployee(body, (err, select_result) => {
//             if(select_result.length >0){
//                 res.status(400).json({
//                     status: "Error",
//                     message: "Employee ID Already Exist"
//                 })
//             }else{
//                 addEmployee(body, (err, result) => {
//                     if (err) {
//                         res.status(400).json({
//                             status: "Error",
//                             message: "Error in Database" + err
//                         })
//                     } else {
//                         res.status(200).json({
//                             status: "success",
//                             data: "Employee added succesfully"
//                         })
//                     }
//                 })
//             }
//         })
//     }
// }