const conn = require("../connections/dbConnection")

module.exports = {
    departmentQuery: (callback) => {
        query = "SELECT department FROM departments"
        conn.query(query, (err, result) => {
            if(err){
                return callback (err, null)
            }else{
                return callback (null, result)
            }
        })
    }
}