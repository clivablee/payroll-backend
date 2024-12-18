const conn = require('../connections/dbConnection')

module.exports = {
    loginQuery: (data, callback) => {
       conn.query("SELECT * FROM employee_information WHERE email_work = ? AND password = ?", [data.username, data.password], (err, result) => {
        if(err){
               return callback("Database Error "+ err, null)
           } else {
               return callback(null, result)
           }
       })
    }
}
