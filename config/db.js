require('dotenv').config();
const mysql = require('mysql2');

// connecting to mysql database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: true
});

connection.connect((err)=>{
    if(err){
        console.log('connection error:' + err.stack);
        return;
    }
    console.log('Database Connected');
});

module.exports = connection;
