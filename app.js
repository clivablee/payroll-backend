const express = require("express");
require ("dotenv").config();
const app = express();
const port = process.env.port;
const cors = require("cors");
const router = require("./routers/router");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000', // Development origin
            'https://biocostech-hris.vercel.app', // Production origin
        ];

        // Allow requests with no origin (e.g., mobile apps, Postman) or match the allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
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




