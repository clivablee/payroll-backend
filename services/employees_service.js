const conn = require('../connections/dbConnection');


module.exports = {
    getAllEmployees: (callback) => {
        const query = "SELECT emp_id, first_name, middle_name, last_name, job_title, department FROM employee_information"
        conn.query(query, (err, result) => {
            if (err){
                return("Database Query Error " + err, null)
            }
            else{
                return callback(null, result)
            }
        })
    },
    selectEmployee: (data, callback) => {
        const query = "SELECT * FROM employee_information WHERE emp_id = ?"
        conn.query(query, [data.emp_id], (err, result) => {
            if (err){
                return("Database Query Error " + err, null)
            }
            else{
                return callback(null, result)
            }
        })
    },

    addEmployee: (data, callback) => {
        const query = "INSERT INTO employee_information (emp_id, salary, daily_rate, hourly_rate, minute_rate) VALUES (?, ?, ?, ?, ?)"

        const basic_salary = data.salary/2
        const daily_rate = data.salary/26
        const hourly_rate = daily_rate/8
        const minute_rate = hourly_rate/60

        conn.query(query, [data.emp_id, data.salary, daily_rate, hourly_rate, minute_rate], (err, result) => {
            if (err){
                return("Database Query Error " + err, null)
            }
            else{
                return callback(null, result)
            }
        })
    }

}