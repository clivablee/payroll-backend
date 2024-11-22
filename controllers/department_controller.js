const { departmentQuery } = require("../services/department_service")

module.exports = {
    loadDepartment: (req, res) => {
        departmentQuery((err, result) => {
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