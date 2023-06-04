const app = require("./app");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary")

const connectDatabase = require("./config/database");
app.use(cors());

//Handling uncaught exceptions
process.on("UncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to some uncaught Exception`);
    process.exit(1);
})


//config
dotenv.config({path:"config/config.env"});

//connection to database
connectDatabase()


//Connect to cloud for image upload
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})



const server = app.listen(4000, ()=>{
    console.log(`Server is working on http://localhost:4000`)
})


//Unhandle Promise Rejection
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to some unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });

});