INSERT INTO departments (name) 
VALUES ("Marketing"),
("Human Resources"),
("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Manager", 75000, 1),
("Social Media Marketer", 50000, 1),
("HR Director", 120000, 2),
("HR Specialist", 45000, 2),
("Attorney", 150000, 3),
("Legal Clerk", 65000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, null),
("Patty", "Johansen", 2, null),
("James", "Wright", 3, null),
("Samantha", "Jones", 4, 3),
("George", "Buffalo", 5, null),
("Timothy", "Solo", 6, 4);

INSERT INTO managers (first_name, last_name, role_id, employees_id)
VALUES ("John", "Smith", 1, 1),
("Patty", "Johansen", 2, 2),
("James", "Wright", 3, 3),
("George", "Buffalo", 5, 5);