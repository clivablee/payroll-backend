const conn = require('../connections/dbConnection');

module.exports = {
    getBirthdays: (callback) => {
        const query = "SELECT employee_name, department, DATE_FORMAT(date_of_birth, '%M %D') AS date_of_birth FROM employee_information WHERE MONTH(date_of_birth) = MONTH(CURRENT_DATE) ORDER by DAY(date_of_birth) ASC" 
        
        conn.query(query, (err, result) => {
                if (err) {
                    return callback("Database Error " + err, null)
                } else {
                    return callback(null, result)
                }
            });
            
}}