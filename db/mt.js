2
const connection = require ('./connection');

class DB {
    constructor(connection){
        this.connection = connection;
    }


    viewAllEmployees() {
        return this.connection.query(
            `SELECT employee.id, employee.first_name, employee.last_name, job.title, department.name AS department, job.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN job
            ON employee.job_id = role.id
            LEFT JOIN department 
            ON job.department_id = department.id 
            LEFT JOIN employee manager 
            ON manager.id = employee.manager_id;
            `
        )
    };

    viewAllJobs() {
        return this.connection.query(
            `SELECT job.id, job.title, job.salary, department.name AS department
            FROM job 
            LEFT JOIN department
            ON job.department_id = department.id;`
        )
    };

    viewAllDepartments(){
        return this.connection.query(
            `SELECT * FROM department`
        )
    };

    addEmployee(first_name, last_name, job_id, manager_id) {
        return this.connection.query("INSERT INTO employee SET ?", {
          first_name: first_name,
          last_name: last_name,
          job_id: job_id,
          manager_id: manager_id
        });
    };

    addDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", {
          name: department
        });
    };

    addRole(job, salary, department) {
        return this.connection.query("INSERT INTO job SET ?", {
          title: job,
          salary: salary,
          department_id: department
        });
    };
    
    updateEmployeeJob(job_id, id) {
        return this.connection.query(
          `UPDATE employee
            SET job_id = ? 
            WHERE id = ?;`,
          [job_id, id]
        );
    };

    
    findEmployee() {
    return this.connection.query("SELECT id, first_name, last_name FROM employee");
    }

    findJobs() {
    return this.connection.query("SELECT id, title FROM job");
    }

}

module.exports = new DB(connection);