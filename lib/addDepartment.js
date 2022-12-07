const { default: inquirer } = require("inquirer");
const { db } = require("../utils");

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then(function (userInput) {
      db.query("INSERT INTO departments (name) VALUES ?");
      // TODO: get user input to ?
      db.query("SELECT * FROM departments", function (err, results) {
        consoleTable(results);
      });
    });
};

module.exports = { addDepartment };

// FIND ALL OF THE SPECIFIED AREA
