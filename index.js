const inquirer = require("inquirer");
require("console.table");
const db = require("./db/utils");

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
          "View all managers",
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
      if (userInput.choice === "View all managers") {
        viewManagers();
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
    console.table(results);
    baseQuestions();
  });
};

const viewEmployees = () => {
  // Query database
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
    baseQuestions();
  });
};

const viewRoles = () => {
  // Query database
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    baseQuestions();
  });
};

const viewManagers = () => {
  // Query database
  db.query("SELECT * FROM managers", function (err, results) {
    console.table(results);
    baseQuestions();
  });
};

const addDepartment = (req, res) => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then((results) => {
      const sql = `INSERT INTO departments (name)
      VALUES (?)`;
      const params = results.department;

      db.query(sql, params, (err, results) => {
        if (err) {
          res.status(401).json({ error: err.message });
          return;
        }
        res.json({
          message: "Department Added",
          data: body,
        });
        console.log("department added!");
        console.log(params);
        baseQuestions();
      });
    });
};

const addRole = (req, res) => {
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "What role would you like to add?",
      },
      {
        name: "salary",
        type: "number",
        message: "Please enter the yearly salary like this: XXXXXXXX",
      },
      {
        name: "department",
        type: "list",
        message: "What department is this role under?",
        choices: db.query("SELECT * FROM departments.name"),
      },
    ])
    .then((results) => {
      const sql = `INSERT INTO departments (name)
      VALUES (?)`;
      const params = results.department;

      db.query(sql, params, (err, results) => {
        if (err) {
          res.status(401).json({ error: err.message });
          return;
        }
        console.log(Response);
        res.json({
          message: "Role Added",
          data: body,
        });
        console.log("Role added!");
        console.log(params);
        baseQuestions();
      });
    });
};

const addEmployee = (req, res) => {
  inquirer
    .prompt([
      {
        name: "first-name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last-name",
        type: "input",
        message: "What is the employee's last name?",
      },
      // {
      //   name: "role",
      //   type: "list",
      //   message: "What role is this employee filling?",
      //   choices: db.query("SELECT * FROM departments.name"),
      // },{
      //   name: "manager",
      //   type: "list",
      //   message: "Who is this employee's manager?",
      //   choices: db.query("SELECT * FROM departments.name"),
      // },
    ])
    .then((results) => {
      const sql = `INSERT INTO departments (name)
      VALUES (?)`;
      const params = results.department;

      db.query(sql, params, (err, results) => {
        if (err) {
          res.status(401).json({ error: err.message });
          return;
        }
        console.log(Response);
        res.json({
          message: "Employee Added",
          data: body,
        });
        console.log("Employee added!");
        console.log(params);
        baseQuestions();
      });
    });
};

const updateEmployeeRole = (req, res) => {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        message: "Which employee's role needs to be updated?",
        // choices: TODO: list of current employees here.
      },
      {
        name: "role",
        type: "list",
        message: "What role is this employee moving to?",
        // choices: TODO: list of roles here,
      },
    ])
    .then((results) => {
      const sql = `INSERT INTO departments (name)
      VALUES (?)`;
      const params = results.department;

      db.query(sql, params, (err, results) => {
        if (err) {
          res.status(401).json({ error: err.message });
          return;
        }
        console.log(Response);
        res.json({
          message: "Role Updated",
          data: body,
        });
        console.log("Role Updated!");
        console.log(params);
        baseQuestions();
      });
    });
};

baseQuestions();
