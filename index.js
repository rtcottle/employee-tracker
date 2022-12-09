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

const addDepartment = () => {
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
          console.log("You have an error:", err);
          return;
        }
        console.log("department added!");
        baseQuestions();
      });
    });
};

const addRole = () => {
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
        choices: async () => {
          const q = await db.promise().query("SELECT name FROM departments");
          const w = q[0].map((e) => {
            return e.name;
          });
          return w;
        },
      },
    ])
    .then((results) => {
      db.promise()
        .query(
          "SELECT id FROM departments WHERE name=" +
            '"' +
            results.department +
            '"'
        )
        .then((deptId) => {
          const sql = `INSERT INTO roles (title, salary, department_id)
          VALUES (?, ?, ?)`;
          const params = [results.role, results.salary, deptId[0][0].id];

          db.query(sql, params, (err, results) => {
            if (err) {
              console.log("You have an error:", err);
              return;
            }
            console.log("Role added!");
            baseQuestions();
          });
        });
    });
};

const addEmployee = () => {
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
      {
        name: "role",
        type: "list",
        message: "What role is this employee filling?",
        choices: async () => {
          const q = await db.promise().query("SELECT title FROM roles");
          const w = q[0].map((e) => {
            return e.title;
          });
          return w;
        },
      },
      {
        name: "manager",
        type: "list",
        message: "Who is this employee's manager?",
        choices: async () => {
          const q = await db
            .promise()
            .query("SELECT CONCAT(first_name, ` `, last_name) FROM managers");
          const w = q[0].map((e) => {
            return e.name;
          });
          return w;
        },
      },
    ])
    .then((results) => {
      const sql = `INSERT INTO employees (first_name, last_name, role, manager)
      VALUES (?, ?, ?, ?)`;
      const params = [
        results.first_name,
        results.last_name,
        results.role,
        results.manager,
      ];

      db.query(sql, params, (err, results) => {
        if (err) {
          console.log("You have an error:", err);
          return;
        }
        console.log("Employee added!");
        baseQuestions();
      });
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        message: "Which employee's role needs to be updated?",
        choices: async () => {
          const q = await db
            .promise()
            .query("SELECT CONCAT(first_name) FROM employees");
          const w = q[0].map((e) => {
            return e.first_name;
          });
          return w;
        },
      },
      {
        name: "role",
        type: "list",
        message: "What role is this employee moving to?",
        choices: async () => {
          const q = await db.promise().query("SELECT title FROM roles");
          const w = q[0].map((e) => {
            return e.title;
          });
          return w;
        },
      },
    ])
    .then((results) => {
      const sql = `INSERT INTO roles (title)
      VALUES (?)`;
      const params = results.roles;

      db.query(sql, params, (err, results) => {
        if (err) {
          console.log("You have an error:", err);
          return;
        }
        console.log("Role Updated!");
        baseQuestions();
      });
    });
};

baseQuestions();
