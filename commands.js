const cTable = require('console.table');
const index = require('./index');
const db = require('./db/connection');


const viewDepartments = () => {
    db.execute(
        `SELECT * FROM departments;`,
        function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
            index.promptConfirm();
        }
    );
};

const viewRoles = () => {
    db.execute(
        `SELECT title AS "Job Title", role_id AS "Job ID", dept_id AS "Department ID", salary AS "Salary" FROM roles;`,
        function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
            index.promptConfirm();
        }
    );
};

const viewEmployees = () => {
    db.execute(
        `SELECT employees.emp_id AS "Employee ID" , employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Job Title", roles.salary AS "Salary", departments.title AS "Department Name"
        FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.role_id 
        AND employees.role_id = roles.role_id
        LEFT JOIN departments ON roles.dept_id = departments.dept_id;`
    ,
        function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
            index.promptConfirm();
        }
    );
};

const addDepartment = department => {
    db.execute(
        `INSERT INTO departments (dept_id, title) VALUE ( ${department.id} , "${department.title}");`,
    );
    viewDepartments();
};

const addRole = role => {
    db.execute(
        `INSERT INTO roles (title, salary, department_id) VALUES ("${role.title}", "${role.salary}", "${role.departmentID}");`,
        );
    viewRoles();
};

const addEmployee = employee => {
    db.execute(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${employee.firstName}", "${employee.lastName}", "${employee.roleID}", "${employee.managerID}");`,
        );
    viewEmployees();
};

const updateRole = update => {
    db.execute(
        `UPDATE employees SET role_id = "${update.roleID}" WHERE id = "${update.employeeID}";`,
    );
    viewEmployees();
};



module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole
}