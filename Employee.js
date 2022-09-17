const mysql = require("mysql2");
const inquirer = require("inquirer");
const ConsoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  user: "root",
  password: "root1995",
  database: "employee_tracker",
},console.log(`connected to db with id`));

function viewDepartments(){
    connection.query('SELECT * FROM department', function (err, results) {
        if(err) {
            console.error(err)
          }
          console.log(results)
      });
      
      
     
}

function viewRoles(){
    connection.query('SELECT * FROM department', function (err, results) {
        if(err) {
            console.error(err)
          }
          console.log(results)
      });
      
      
     
}

function viewEmployees(){
    connection.query('SELECT * FROM department', function (err, results) {
        if(err) {
            console.error(err)
          }
          console.log(results)
      });
      
      
     
}
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuControl",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "quit",
        ],
      },
    ])
    .then((response) => {
      if (response.menuControl == "view all departments") {
        viewDepartments();
      } else {
        console.log(response); //Add in remaining if else statmenmts for remaining conditions
      }
    });

    .then((response) => {
        if (response.menuControl == "view all roles") {
          viewRoles();
        } else {
          console.log(response); //Add in remaining if else statmenmts for remaining conditions
        }
      });

      .then((response) => {
        if (response.menuControl == "view all employees") {
          viewEmployees();
        } else {
          console.log(response); //Add in remaining if else statmenmts for remaining conditions
        }
      });

}
init();
