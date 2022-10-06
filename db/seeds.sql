
INSERT INTO departments(department_name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles(job_title, department_id, salary)
VALUES 
('Sales Lead', 1, 100000),
('Salesperson', 1, 80000),
('Lead Engineer', 2, 150000),
('Software Engineer', 2, 120000),
('Account Manager', 3, 160000),
('Accountant', 3, 125000),
('Legal Team Lead', 4, 250000),
('Lawyer', 4, 190000);

INSERT INTO employees(first_name, last_name, role_id, department_id, salary_id, manager_id)
VALUES
('Candy', 'Man', 1, 1, 1, NULL),
('Pin', 'Head', 2, 1, 2, 1),
('Jason', 'Voorhees', 3, 2, 3, NULL),
('Jack', 'Torrance', 4, 2, 4, 3),
('Carrie', 'White', 5, 3, 5, NULL),
('Ghost', 'Face', 6, 3, 6, 5),
('Slender', 'Man', 7, 4, 7, NULL),
('Penny', 'Wise', 8, 4, 8, 7);





