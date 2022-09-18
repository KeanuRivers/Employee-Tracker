const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection(
  {
    host: "localhost",

    user: "root",
    password: "root1995",
    database: "employee_tracker",
  },
  console.log(`connected to db with id`)
);
init();

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.error(err);
    }
    console.log(results);
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.error(err);
    }
    console.log(results);
  });
}

function viewEmployees() {
  connection.query("SELECT e.first_name, e.last_name, e.id AS employee_id, r.salary, r.title, d.name AS department_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id;", function (err, results) {
    if (err) 
      throw(err);
    
    console.table(results);
    init();
  });
}

function addEmployee() {
  inquirer.prompt([
    {
        type: "Input",
        name: "firstName",
        message: "Enter Employee First Name"
    },
    {
        type: "Input",
        name: "lastName",
        message: "Enter Employee Last Name"
    },
    {
        type: "List",
        name: "roleId",
        message: "Enter Employee Role ID",
        choices: [1,2,3,4,5,6,7]
    },
    {
        type: "List",
        name: "managerId",
        message: "Enter Manager ID",
        choices: [1,2,3]
    },
  ]).then((Response) => {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE(?,?,?,?)", [Response.firstname, Response.lastname, Response.roleid, Response.managerid], (err,result)=>{
        if(err)
            throw err

            console.table(result);
            init();
    })
  })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "Input",
            name: "departmentName",
            message: "Enter department Name"
        }
    ]).then((res) => {
        connection.query("INSERT INTO department(name)  VALUE (?);", res.departmentName,

         (err, result) => {
            if (err)
                throw err

            console.table(result);
            init();
        })
    })
};

function addRole () {
    inquirer.prompt([
        {
            type: "Input",
            name: "title",
            message: "Add Role Title."
        },
        {
            type: "Input",
            name: "salary",
            message: "Enter hourly Salary"
        },
        {
            type: "Input",
            name: "departmentId",
            message: "Enter department ID (1-3)"
        }
    ]).then((res) => {
        connection.query("INSERT INTO role(title, salary, department_id) VALUE (?, ?, ?)", [res.title, res.salary, res.departmentId], (err) => {
            if (err) throw err

            console.table(res)
            init();
        })
    })
};

function init() {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        choices: [
          "add employee",
          "add role",
          "add department",
          "view department",
          "view role",
          "view employee",
        ],
      },
    ])
    .then((userResponse) => {
      switch (userResponse.employee) {
        case "add employee":
          addEmployee()
          break;
        case "add role":
          addRole()
          break;
        case "add department":
          addDepartment()
          break;
        case "view employee":
          viewEmployees()
          break;
        case "view roles":
          viewRoles()
          break;
        case "view departments":
          viewDepartments()
          break;
        default:
          connection.end();
          process.exit(0);
      }
    });
}
