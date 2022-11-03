const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes")

const app = express();
const username = "rw-user-db";
const password = "password1234";
const cluster = "localhost";
const dbname = "myFirstDatabase";

mongoose.connect(`mongodb://localhost:27017/referwell`).catch(err => console.log(err.reason));

app.use(express.json());
 
app.use('/api', Router)
app.listen(3400, () => {
    console.log(`Server Started at ${3400}`)
})