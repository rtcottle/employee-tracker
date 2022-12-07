const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "employee_tracking",
  },
  console.log(`Connected to the employee_tracking database.`)
);
db.connect(() => {
  // console.log("Connected");
});
module.exports = db;
