const express = require("express");
require ("dotenv").config();
const app = express();
const port = process.env.port;
const cors = require("cors");
const router = require("./routers/router");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/json' }));

 
app.get("/test", (req, res) => {
    res.send(" World!");
});

app.use("/v1", router);

app.listen(port, () => {
    try {   
        console.log(`App listening on port ${port}`);
    } catch (e) {
        console.log(e);
    }
});


module.exports = app 




