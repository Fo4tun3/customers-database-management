const env = require("dotenv").config();
const mysql = require('mysql2/promise');

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE
});

connectionPool.getConnection()
.then(conn => {
  console.log('Database Connection Validation Sucessful');
  conn.release();
})
.catch(err =>{
  console.log('Error connecting to Database!!!');
});

module.exports = connectionPool;


// const { Pool } = require("pg");
// const pool = new Pool({
//     // user: process.env.DB_USER,
//     // host: process.env.DB_HOST,
//     // password: process.env.DB_PASSWORD,
//     // database: process.env.DB_DATABASE,
//     // port: process.env.DB_PORT,
//     connectionString: process.env.DB_CONNECTION_STRING,
// });
// pool.connect();
// console.log('Connected to Database');

// module.exports = {pool, connectionPool};
