const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./db/db-connection");
const users = require("./routes/User")
const cors = require('cors')

//MiddleWare
app.use(express.json())
app.use(cors());
app.use("/api/v1/users" , users);

// app.get('/', (req, res) => {
//     res.send('Hello');
// });

// connectDB();

// app.listen(port,()=>{
//     console.log(`app listening on port ${port}....`)
// })

const start = async ()=>{
    try {
        await connectDB("mongodb://localhost:27017/mydatabase");
        app.listen(port,()=>{
            console.log(`app listening on port ${port}....`)})
    } catch (error) {
        console.log(error);
    }
}

start()