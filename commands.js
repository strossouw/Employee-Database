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
        `SELECT employees.emp_id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS job_title, roles.salary AS salary, departments.title AS department_name, 
		CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.role_id 
        LEFT JOIN departments ON roles.dept_id = departments.dept_id
        LEFT JOIN employees manager ON manager.manager_id = employees.manager_id`
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
        `INSERT INTO roles (role_id, title, salary, dept_id) VALUES (${role.id}, "${role.title}", ${role.salary}, ${role.dept_id});`,
        );
    viewRoles();
};

const addEmployee = employee => {
    db.execute(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${employee.first_name}", "${employee.last_name}", "${employee.role_id}", "${employee.manager_id}");`,
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