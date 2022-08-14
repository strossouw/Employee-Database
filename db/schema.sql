DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role; 

CREATE TABLE department(
    id INTEGER PRIMARY KEY,
    name VARCHAR (30)
);

CREATE TABLE role(
    id INTEGER PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL (10,2),
    department_id INTEGER
) ;