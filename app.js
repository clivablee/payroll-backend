const express = require("express");
require ("dotenv").config();
const app = express();
const port = process.env.port || 5500;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// app.use("/test", "Hello world");

app.listen(port, () => {
    try {   
        console.log(`App listening on port ${port}`);
    } catch (e) {
        console.log(e);
    }
});


module.exports = app 





