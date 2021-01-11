'use strict';

const inquirer = require("inquirer");
const prompt = require ("./question");
const cTable = require(`console.table`);
const db = require ("./db/mt");



function init(){
    console.log("Employee Manager!")
    optionPrompt();
}



async function optionPrompt() {
    const answer = await inquirer.prompt(prompt.choice)

    switch(answer.choice){
        case 'VIEW_EMPLOYEES': return viewEmployees();
        case 'VIEW_DEPARTMENTS': return viewDepartments();
        case 'VIEW_JOBS': return viewJobs();
        case 'ADD_EMPLOYEE' : return addEmployee();
        case 'ADD_DEPARTMENT': return addDepartment();
        case 'ADD_JOB': return addJob();
        case 'UPDATE_EMPLOYEE_JOB': return updateJob();
        case 'EXIT': process.exit() ;
    }

}


// These are the view functions
async function viewEmployees() {
    const res = await db.viewAllEmployees();
    console.table("", res);
    optionPrompt();
};

async function viewDepartments(){
    const res = await db.viewAllDepartments();
    console.table("", res);
    optionPrompt();
};

async function viewJobs() {
    const res = await db.viewAllJobs();
    console.table("", res);
    optionPrompt();
};


//  Fucntion to add employees 
async function addEmployee() {
    const jobs = await db.findJobs();
  
    const jobList = jobs.map(record => {
      return record.title;
    });
  
    const employees = await db.findEmployee();
  
    const employeeList = employees.map(record => {
      return record.first_name.concat(" " + record.last_name);
    });
  
    employeeList.unshift("None");
  
    const answer = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "Employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "Employee's last name?"
      },
      {
        name: "job",
        type: "list",
        message: "Employee's job?",
        choices: jobList
      },
      {
        name: "manager",
        type: "list",
        message: "Employee's manager's name?",
        choices: employeeList
      }
    ]);
  
    let managerId;
    if (answer.manager !== "None") {
      const managerRecord = employees.find(
        resultEntry =>
          answer.manager === resultEntry.first_name + " " + resultEntry.last_name
      );
  
      managerId = managerRecord.id;
    }
    const jobRecord = jobs.find(
      resultEntry => resultEntry.title === answer.job
    );
    const jobId = jobRecord.id;
  
    await db.addEmployee(answer.firstName, answer.lastName, jobId, managerId);
  
    console.log(`Added ${answer.firstName} to the database.`);
    optionPrompt();
};
  
//Function to add departments
async function addDepartment() {
    const answer = await inquirer.prompt({
      name: "department",
      type: "input",
      message: "Which deparment would you like to add to our company?"
    });
  
    const res = await db.addDepartment(answer.department);
  
    console.log(`Is added ${answer.department} to the the database.`);
    optionPrompt();
}

// Function to add jobs to database
async function addJob() {

  const department = await db.viewAllDepartments();
  
  const deparmentList = department.map(({id,name}) => 
  ({name:name, value:id}));

  console.log(deparmentList);

    const answer = await inquirer.prompt([
      {
        name: "job",
        type: "input",
        message: "What job do you want to add?"
      },


      {
        name: "salary",
        type: "input",
        message: "The salary for that job?"
      },

      {
        name: "department_id",
        type: "list",
        message: "What department does the job belong too?",
        choices: deparmentList 
      }
    ]);
  
    const res = await db.addJob(answer.job, answer.salary, answer.department_id,);
    console.log(`You added ${answer.job} to the the database.`);
    optionPrompt();

}

// Function to update jobs
async function updateJob() {
    const employees = await db.findEmployee();
  
    const employeeList = employees.map(record => {
      return record.first_name.concat(" " + record.last_name);
    });
  
    const jobs = await db.findJobs();
  
    const jobList = jobs.map(record => {
      return record.title;
    });
  
    const answer = await inquirer.prompt([
      {
        name: "name",
        type: "list",
        message: "Choose the employee do you want to update?",
        choices: employeeList
      },
      {
        name: "job",
        type: "list",
        message: "Employee's updated job?",
        choices: jobList
      }
    ]);
  
    const employeeSelect = employees.find(
      resultEntry =>
        answer.name === resultEntry.first_name + " " + resultEntry.last_name
    );
  
    const employeeId = employeeSelect.id;
  
    const jobRecord = jobs.find(
      resultEntry => resultEntry.title === answer.job
    );
    const jobId = jobRecord.id;
  
    await db.updateEmployeeJob(jobId, employeeId);
  
    console.log(
      ` ${answer.name} Is updated in the database.`
    );
    optionPrompt();
};

init();