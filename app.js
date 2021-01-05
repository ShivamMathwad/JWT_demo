const express = require('express');
const mysql = require('mysql');
var cookieParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//Route setup
const userRouter = require('./routes/users');


//Database connection
global.mysqldbconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shivam25",
    database: "node_jwt"
});
mysqldbconnection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected!");
    }
});

//Routes
app.use("/api", userRouter);


app.listen(5000, () => console.log('Server started on port 5000'));
