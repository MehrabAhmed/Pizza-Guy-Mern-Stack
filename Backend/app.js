const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error")
const corsOptions ={
    origin:'http://localhost:3000',
    'Content-Type': 'Authorization',
    credentials:true,
    optionSuccessStatus:200
    }

app.use(express.json())
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./Routes/productRoute");
const user = require("./Routes/userRoutes");
const order = require("./Routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Error Middleware
app.use(errorMiddleware);

module.exports = app;