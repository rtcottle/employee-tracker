DROP DATABASE IF EXISTS employee_tracking;
CREATE DATABASE employee_tracking;

USE employee_tracking;

CREATE TABLE departments (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES departments(id)
ON DELETE SET NULL
);

CREATE TABLE employees (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT DEFAULT NULL, 
FOREIGN KEY (role_id)
REFERENCES roles(id)
ON DELETE SET NULL
);

CREATE TABLE managers (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
employees_id INT, 
FOREIGN KEY (employees_id)
REFERENCES employees(id)
ON DELETE SET NULL,
FOREIGN KEY (role_id)
REFERENCES roles(id)
ON DELETE SET NULL

);