"use strict";

module.exports = {
    choice: [{
        type:'list',
        name:'choice',
        message:'Please choose an option',
        choices: [
        {
            name:'View employees',
            value:'VIEW_EMPLOYEES'
        },
        {
            name:'View departments',
            value:'VIEW_DEPARTMENTS'
        },
        {
            name:'View jobs',
            value:'VIEW_JOBS',
        },
        {
            name:'Add an employee',
            value:'ADD_EMPLOYEE'
        },
        {
            name:'Add a job',
            value:'ADD_JOB'
        },
        {
            name:'Add a department',
            value:'ADD_DEPARTMENT'
        },
        {
            name:'Update employee job',
            value:'UPDATE_EMPLOYEE_JOB'
        },
        {
            name:'EXIT',
            value:'EXIT'
        }]
            
        
    }]
};