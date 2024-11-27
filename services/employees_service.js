const conn = require('../connections/dbConnection');

module.exports = {
    getAllEmployees: async () =>  {
        const query = "SELECT emp_id, first_name, middle_name, last_name, job_title, department FROM employee_information"
        return new Promise((onSuccess, onError) => {
            conn.query(query, (err, result) => {
                if(err){
                    onError("Database Query Error " + err, null)
                }
                else{
                    onSuccess(result)
                }
            })
        })
    },

    filterQuery: async (data) => {
        let filter_query = "SELECT emp_id, employee_name, first_name, middle_name, last_name, job_title, department FROM employee_information" 
        //query condition
        const query_params = []
        if(data.department !== "All"){
            filter_query += " WHERE department = ?"
            query_params.push(data.department)
        }
        if(data.department === "All" && data.active_status !== "All"){
            filter_query += " WHERE active_status = ?"
            query_params.push(data.active_status)

        }else if(data.active_status !== "All"){
            filter_query += " AND active_status = ?"
            query_params.push(data.active_status)
        }

        return new Promise((onSuccess, onError) => {
            conn.query(filter_query, query_params, (err, filter_result) => {
                if (err) {
                    onError("Database error"+err)
                } else {
                    const head_count = filter_result.length
                    onSuccess({
                        "total_employees":head_count,
                        "data": filter_result
                    })
                }
            })
        })
    },

    searchEmployeeQuery: async (data, callback) => {
        let filter_query= "SELECT emp_id, employee_name, first_name, middle_name, last_name, job_title, department FROM employee_information WHERE employee_name LIKE ?"
        //query condition
        const search_employee_name = "%"+data.employee_name+"%"
        const query_params = [search_employee_name]

            if(data.department !== "All"){
                filter_query += " AND department = ?"
                query_params.push(data.department)
            }

            if(data.active_status !== "All"){
                filter_query += " AND active_status = ?"
                query_params.push(data.active_status)
            }

            return new Promise((onSuccess, onError) => {
                conn.query (filter_query, query_params, (err, filter_result) => {
                    const head_count = filter_result.length
                    if (err){
                        onError("Database Query Error " + err, null)   
                    }
                    else{
                        onSuccess({
                            "total_employees": head_count,
                            
                            "data": filter_result
                        })
                    }
                })
            })
    },
       
    selectEmployee: async (data) => {
        const query = "SELECT * FROM employee_information WHERE emp_id = ?"
        return new Promise((onSuccess, onError) => {
            conn.query(query, [data], (err, result) => {
                if (err){
                    throw onError("Database Query Error" + err)
                }
                else{
                    return onSuccess(result)
                }
            })
        })
    },
    addEmployeeQuery: async (data) => {
        const query = "INSERT INTO employee_information (emp_id, employee_img, employee_name, first_name, middle_name, last_name, salary, basic_salary, daily_rate, hourly_rate, minute_rate) VALUES (?,  ?, ?, ?, ?, ?, ?, ?, ?, ?)"

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
        return new Promise((onSuccess, onError) => {
        conn.query(query, [data.emp_id, data.imagePath, employee_name, data.first_name, data.middle_name, data.last_name, data.salary, basic_salary, daily_rate, hourly_rate, minute_rate], (err, result) => {
               if (err){
                    throw onError("Database Query Error: " + err.message)
               }
               else{
                   onSuccess(result)
               }
           })
        })
    }
}