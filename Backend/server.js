const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./db/db-connection");
const users = require("./routes/User");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true // Allow credentials (cookies, authorization headers, TLS client certificates)
}));
app.use(cookieParser());
app.use("/api/v1/users", users);

// Connect to the database and start the server
const start = async () => {
    try {
        await connectDB("mongodb://localhost:27017/mydatabase");
        app.listen(port, () => {
            console.log(`App listening on port ${port}....`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
