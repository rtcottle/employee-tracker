const inquirer = require("inquirer");
// const Manager = require("./manager");
// const Employee = require("./employee");
// const role = require("./role");

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
        quit();
      }
    });
};

baseQuestions();
