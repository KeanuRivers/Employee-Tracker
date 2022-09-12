DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE employee(
   id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INTEGER,
    manager_id INTEGER,
    
    PRIMARY KEY(id),
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id)
);

CREATE TABLE department(
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(50),
    salary DECIMAL(5,2),
    department_id INTEGER,
    PRIMARY KEY(id),
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id)
);