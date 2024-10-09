const connection = require('mysql2');
const conn = connection.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT 

});


try {
    if(conn.connect()){
        console.log("DB connected");    
    }
} catch (error) {

    console.log("Error connecting in DB", error);   
    
}

module.exports = conn

