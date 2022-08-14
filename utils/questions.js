const inquirer = require('inquirer');
const {viewDepartment, viewRole, viewEmployee, newDepartment, newRole, newEmployee} = require('../db/queries');


const promptUser = () => {
    console.log('Employee Manager'); TODO://this need to be jazzed up TODO:
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ["View all Departments", "Add a Department", "View all Roles", "Add a role", "View all Employees", "Add an Employee"]
        },
    ])
    .then(choice => {
        if(choice.menu === "View all Departments"){
            console.log('View All Departments');
            viewDepartment();
        }
        if(choice.menu === "Add a Department"){
            console.log("Add a Department");
            newDepartment();
        }
        if(choice.menu === "View all Roles"){
            console.log("View all Roles");
            viewRole();
        }
        if(choice.menu === "Add a role"){
            console.log("Add a role");
            newRole();
        }      
        if(choice.menu === "View all Employees"){
            console.log("View all Employees");
            viewEmployee();
        }      
        if(choice.menu === "Add an Employee"){
            console.log("Add an Employee");
            newEmployee();
        }
    })
};


promptUser()

module.exports = {promptUser};
