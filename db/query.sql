SELECT *
FROM departments ON roles.department_id = departments.id;

SELECT *
FROM roles ON employees.role_id = roles.id;

SELECT *
FROM employees ON managers.employee_id = employees.id;

SELECT *
FROM employees ON managers.role_id = roles.id;