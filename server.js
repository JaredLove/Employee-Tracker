const inputCheck = require('./utils/inputCheck');

const express = require('express');

const inquirer = require("inquirer");

const mysql = require('mysql2');

require("console.table");

const PORT = process.env.PORT || 3001;

const app = express();

// express middleware

app.use(express.urlencoded({ extended: false}));

app.use(express.json());



// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Callofduty@*4321',
      database: 'employees'
    },
    console.log('Connected to the employees database.')
  );
  db.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + db.threadId);
    console.log("EMPLOYEE MANAGER!!!!!!!   (:");
    // runs the app
    firstPrompt();
});

// function which prompts the user for what action they should take
function firstPrompt() {

  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Would you like to do?",
      choices: [
        "View Employees",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "End"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          viewEmployee();
          break;

      case "Add Employee":
          addEmployee();
          break;

          case "Remove Employee":
            removeEmployee();
            break;

      case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "View All Roles":
          viewRoles();
          break;

      case "Add Role":
          addRole();
          break;
     

        case "View All Departments":
          viewDepartments();
          break;
        
          case "Add Department":
            addDepartment();
            break;

      

        

        case "End":
            db.end();
          break;
      }
    });
}

//View Employees/ READ all, SELECT * FROM
function viewEmployee() {


    const query =
    `SELECT e.id, e.first_name, e.last_name, roles.job_title, departments.department_name AS department, roles.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employees e
  LEFT JOIN roles
	ON e.role_id = roles.id
  LEFT JOIN departments
  ON departments.id = roles.department_id
  LEFT JOIN employees m
	ON m.id = e.manager_id`

  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Viewing Employees!\n");
    firstPrompt();
  });

}

function viewRoles() {


    const query =
    `SELECT r.id, r.job_title, d.department_name, r.salary
    FROM roles r
    LEFT JOIN departments d
    ON d.id = r.department_id`;

  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Viewing Roles!\n");
    firstPrompt();
  });

}

function viewDepartments() {

    const query =
    `SELECT * FROM departments`;

  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Viewing Departments!\n");
    console.table(res);
    firstPrompt();
  });

}

// Make a employee array
function addEmployee() {
  console.log("Adding an employee!")

  var query =
    `SELECT r.id, r.job_title, d.department_name, r.salary
    FROM roles r
    LEFT JOIN departments d
    ON d.id = r.department_id`

  db.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, job_title, salary }) => ({
      value: id, name: `${job_title}`, salary: `${salary}`
    }));
    //const managerChoices = res.map(({ id,  }) => ({
      //value: id, name: `${first_name}`
    //}));

    console.table(res);
    console.log("Get Role!");

    promptInsert(roleChoices);
  });
}

function promptInsert(roleChoices, managerChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
      }
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employees SET ?`
      // when finished prompting, insert a new item into the db with that info
      db.query(query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Employee added successfully!\n");

          firstPrompt();
        });
    });
}

//"Remove Employees" / DELETE, DELETE FROM
// Make a employee array to delete
function removeEmployee() {
  console.log("Deleting employee");

  var query =
    `SELECT employees.id, employees.first_name, employees.last_name
      FROM employees`

  db.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res);
    console.log("Delete array!\n");

    promptDelete(deleteEmployeeChoices);
  });
}

// User choose the employee list, then employee is deleted
function promptDelete(deleteEmployeeChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: deleteEmployeeChoices
      }
    ])
    .then(function (answer) {

      const query = `DELETE FROM employees WHERE ?`;
      // when finished prompting, insert a new item into the db with that info
      db.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Destroyed!\n");

        firstPrompt();
      });
    });
}

//"Update Employee Role" / UPDATE,
function updateEmployeeRole() { 
  employeeArray();

}

function employeeArray() {
  console.log("Updating an employee");

  var query =
    `SELECT e.id, e.first_name, e.last_name, r.job_title, d.department_name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employees e
  JOIN roles r
	ON e.role_id = r.id
  JOIN departments d
  ON d.id = r.department_id
  JOIN employees m
	ON m.id = e.manager_id`

  db.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);
    console.log("Updated to employeeArray!\n")

    roleArray(employeeChoices);
  });
}

function roleArray(employeeChoices) {
  console.log("Role being updated");

  var query =
    `SELECT r.id, r.job_title, r.salary 
  FROM roles r`
  let roleChoices;

  db.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, job_title, salary }) => ({
      value: id, name: `${job_title}`, salary: `${salary}`      
    }));

    console.table(res);
    console.log("Update to roleArray!\n")

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices, roleChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee did you want to set with a role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role did you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employees SET role_id = ? WHERE id = ?`
      // when finished prompting, insert a new item into the db with that info
      db.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "success!");

          firstPrompt();
        });
    });
}



//"Add Role" / CREATE: INSERT INTO
function addRole() {

  var query =
    `SELECT departments.id, departments.department_name, roles.salary AS budget
    FROM employees
    JOIN roles
    ON employees.role_id = roles.id
    JOIN departments
    ON departments.id = roles.department_id
    GROUP BY departments.id, departments.department_name`

  db.query(query, function (err, res) {
    if (err) throw err;

    // (callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any)
    const departmentChoices = res.map(({ id, department_name }) => ({
      value: id, name: `${id} ${department_name}`
    }));

 

    addRole(departmentChoices);
  });
}

function addRole(departmentChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Role?"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Salary?"
      },
      {
        type: "list",
        name: "departmentId",
        message: "Department?",
        choices: departmentChoices
      },
    ])
    .then(function (answer) {

      var query = `INSERT INTO roles SET ?`

      db.query(query, {
        job_title: answer.roleTitle,
        salary: answer.roleSalary,
        department_id: answer.departmentId
      },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Role Added!");

          firstPrompt();
        });

    });
}

function addDepartment() {
  var query = `SELECT * FROM departments`

  db.query

  departmentPrompt()
}
function departmentPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'Department Name?'
      }
    ])
    .then(function (answer) {

      var query = `INSERT INTO departments SET ?`

      db.query(query, {
        department_name: answer.department
      },
        function (err, res) {
          if (err) throw err;

          
          console.log("Department Created!");

          firstPrompt();
        });

    });
}