const express = require("express");
const path = require("path");
const api = require("./index.js");
// Import and require mysql2
const mysql = require("mysql2");
const consoleTable = require("console.table");

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_tracking",
  },
  console.log(`Connected to the employee_tracking database.`)
);

// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Query database
db.query("SELECT * FROM course_names", function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
