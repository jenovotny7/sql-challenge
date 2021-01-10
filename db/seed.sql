use employee_trackerDB;

INSERT INTO department
    (name)
VALUES
    ('Actor'),
    ('Writer'),
    ('Producer'),
    ('Cameraman');

INSERT INTO job
    (title, salary, department_id)
VALUES
    ('Actor Lead', 1000000, 1),
    ('Actor', 90000, 1),
    ('Lead Writer', 154000, 2),
    ('Producer', 161000, 3),
    ('Cameraman', 127000, 3);
    

INSERT INTO employee
    (first_name, last_name, job_id, manager_id)
VALUES
    ('Mark', 'Whalberg', 5, NULL),
    ('Spike', 'Lee', 6, 5),
    ('Sarah', 'Silverman', 7, NULL)
    
