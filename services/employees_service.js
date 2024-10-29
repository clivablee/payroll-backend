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

    filterQuery: (data, callback) => {
        let filter_query = "SELECT emp_id, employee_name, first_name, middle_name, last_name, job_title, department FROM employee_information"
        let count_query = "SELECT COUNT(*) as total_count FROM employee_information"

        //query condition
        const query_params = []
        const count_params = []
            if(data.department !== "All"){
                filter_query += " WHERE department = ?"
                count_query += " WHERE department = ?"
                query_params.push(data.department)
                count_params.push(data.department)
            }
            if(data.department === "All" && data.active_status !== "All"){
                filter_query += " WHERE active_status = ?"
                count_query += " WHERE active_status = ?"
                query_params.push(data.active_status)
                count_params.push(data.active_status)

            }else if(data.active_status !== "All"){
                filter_query += " AND active_status = ?"
                count_query += " AND active_status = ?"
                query_params.push(data.active_status)
                count_params.push(data.active_status)
            }

            conn.query(count_query, count_params, (err, count_result) => {
                if(err){
                    return("Database Query Error " + err, null)
                }
                const head_count = count_result[0].total_count
                conn.query(filter_query, query_params, (err, filter_result) => {
                    if (err){
                        return("Database Query Error " + err, null)
                    }
                    else{
                        return callback(null, { "Total Employees": head_count, "Data": filter_result })
                    }
                })
            })
    },

    searchEmployeeQuery: (data, callback) => {
        let filter_query= "SELECT emp_id, employee_name, first_name, middle_name, last_name, job_title, department FROM employee_information WHERE employee_name LIKE ?"
        let count_query = "SELECT COUNT(*) as total_count FROM employee_information WHERE employee_name LIKE ?"

        //query condition
        const search_employee_name = "%"+data.employee_name+"%"

        const query_params = [search_employee_name]
        const count_params = [search_employee_name]

            if(data.department !== "All"){
                filter_query += " AND department = ?"
                count_query += " AND department = ?"
                query_params.push(data.department)
                count_params.push(data.department)
            }

            if(data.active_status !== "All"){
                filter_query += " AND active_status = ?"
                count_query += " AND active_status = ?"
                query_params.push(data.active_status)
                count_params.push(data.active_status)
            }

        
            conn.query(count_query, count_params, (err, count_result) => {
                console.log(filter_query, query_params)
                console.log(count_query, count_params)
                if(err){
                    console.log("error" + err)
                    return("Database Query Error " + err, null)
                }
                const head_count = count_result[0].total_count
                conn.query(filter_query, query_params, (err, filter_result) => {
                    if (err){
                        return("Database Query Error " + err, null)
                    }
                    else{
                        return callback(null, { "Total Employees": head_count, "Data": filter_result })
                    }
                })
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
        const query = "INSERT INTO employee_information (emp_id, employee_name, first_name, middle_name, last_name, salary, basic_salary, daily_rate, hourly_rate, minute_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

        const basic_salary = data.salary/2
        const daily_rate = data.salary/26
        const hourly_rate = daily_rate/8
        const minute_rate = hourly_rate/60

        let middle_initial = "";

        if (data.middle_name.trim().length == 0){
            middle_initial
        }else{
            middle_initial =  data.middle_name.charAt(0).toUpperCase() + "."
        }
        employee_name = data.last_name + ", " + data.first_name + " " + middle_initial
        conn.query(query, [data.emp_id, employee_name, data.first_name, data.middle_name, data.last_name, data.salary, basic_salary, daily_rate, hourly_rate, minute_rate], (err, result) => {
            if (err){
                return("Database Query Error " + err, null)
            }
            else{
                return callback(null, result)
            }
        })
    }
}