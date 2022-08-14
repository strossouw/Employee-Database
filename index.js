const inquirer = require('inquirer');
const db = require('./db/connection');
const {viewDepartment, viewRole, viewEmployee, newDepartment, newRole, newEmployee} = require('./db/queries.js');


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
  });