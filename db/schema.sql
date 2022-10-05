DROP TABLE IF EXISTS employees;
CREATE TABLE employees{
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    role_id INTEGER,
    department_id INTEGER,
    salary_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_title FOREIGN KEY (role_id) REFERENCES roles(job_title) ON DELETE SET NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL.
    CONSTRAINT fk_salaries FOREIGN KEY (salaries_id) REFERENCES roles(salary) ON DELETE SET NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
};

DROP TABLE IF EXISTS roles;
CREATE TABLE roles {
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    department_id INTEGER,
    salary DECIMAL, 
    
    CONSTRAINT fk_department FOREIGN KEY (department) REFERENCES departments(id) ON DELETE SET NULL
};

DROP TABLE IF EXISTS departments;
CREATE TABLE departments {
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
};






