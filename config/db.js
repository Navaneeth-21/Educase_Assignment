require('dotenv').config();
const mysql = require('mysql2');

// connecting to mysql database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err,con)=>{
    if(err) console.log(err);
    console.log('Connected Successfully');
});



module.exports = pool.promise();
