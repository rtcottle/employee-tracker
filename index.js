const inquirer = require("inquirer");
// const managers = require("../routes/manager");
// const employees = require("../routes/employee");
// const roles = require("../routes/role");
// const departments = require("../routes/departments");
const mysql = require("mysql2");

const baseQuestions = () => {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then(function (userInput) {
      if (userInput.choice === "View all departments") {
        viewDepartments();
      }
      if (userInput.choice === "View all roles") {
        viewRoles();
      }
      if (userInput.choice === "View all employees") {
        viewEmployees();
      }
      if (userInput.choice === "Add a department") {
        addDepartment();
      }
      if (userInput.choice === "Add a role") {
        addRole();
      }
      if (userInput.choice === "Add an employee") {
        addEmployee();
      }
      if (userInput.choice === "Update an employee role") {
        updateEmployeeRole();
      }
      if (userInput.choice === "Quit") {
        return console.log("Have a nice day");
      }
    });
};

const viewDepartments = () => {
  // Query database
  db.query("SELECT * FROM departments", function (err, results) {
    consoleTable(results);
  });
};

const viewEmployees = () => {
  // Query database
  db.query("SELECT * FROM employees", function (err, results) {
    consoleTable(results);
  });
};

const viewRoles = () => {
  // Query database
  db.query("SELECT * FROM roles", function (err, results) {
    consoleTable(results);
  });
};

baseQuestions();
