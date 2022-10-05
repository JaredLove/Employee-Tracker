DROP TABLE IF EXISTS employees;
CREATE TABLE employees{
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    job_title INTEGER,
    departments INTEGER,
    salaries INTEGER,
    manager INTEGER,
    CONSTRAINT fk_title FOREIGN KEY (job_title) REFERENCES roles(job_title) ON DELETE SET NULL,
    CONSTRAINT fk_salaries FOREIGN KEY (salaries) REFERENCES roles(salary) ON DELETE SET NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager) REFERENCES managers(manager_name) ON DELETE SET NULL
};

DROP TABLE IF EXISTS managers;
CREATE TABLE managers {
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    manager_name VARCHAR (40) NOT NULL
};


DROP TABLE IF EXISTS roles;
CREATE TABLE roles {
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(50) NOT NULL,
    department INTEGER,
    salary VARCHAR(30)
};


DROP TABLE IF EXISTS departments;
CREATE TABLE departments {
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
};






