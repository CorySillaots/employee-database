const inquirer = require('inquirer');
const db = require('./db/dbQueries');
const { getAllDepartments } = require('./db/dbQueries');


// Initial Prompt
const initialQuestions = [
    {
    
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: 
        [
            'View data',
            'Add data',
            'Update data',
            'Delete data',
            'Exit'
        ]
    }
]
  
const viewQuestions = [
        {
            type:'list',
            name: 'options',
            message: 'What would you like to view?',
            choices: [ 
              'View all departments',
              'View all employees',
              'View all roles',
              'View employees by manager',
              'View employees by department',
              'View department budgets',
            ]
        }
]

const addQuestions = [
          {
            type: 'list',
            name: 'options',
            Message: 'What would you like to add?',
            choices: [
              'Add department', 
              'Add employee',     
              'Add role',
            ]
          }
]

const updateQuestions = [
          {
            type: 'list',
            name: 'options',
            message: 'What would you like to update?',
            choices: [
              'Update an employee role',
              'Update an employee manager',
            ]
          }
]

const deleteQuestions =[
        {
          type: 'list',
          name: 'options',
          message: 'What would you like to delete?',
          choices: [
              'Delete a department',
              'Delete a role',
              'Delete an employee',
          ]
        }
]

// Add an employee
const employeeCreateQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the employee\'s first name?'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s last name?'
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: 'What is the employee\'s role?'
    },
    {
        type: 'input',
        name: 'employeeManager',
        message: 'Who is the employee\'s manager?'
    },
]

// Add a role
const roleCreateQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'input',
        name: 'roleDepartment',
        message: 'What department does the role belong to?'
    },
]

const init = () => {
    inquirer
        .prompt(initialQuestions)
        .then((answers) => { 
            switch(answers.options) {
            case "View data":
                viewData();
                break;
            
            case "Add data":
                addData();
                break;
            
            case "Update data":
                updateData();
                break;
            
            case "Delete data":
                deleteData();
                break;
            
            case "Exit":
                console.log("Good Bye!")
                break;
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
                console.log("Sorry something went wrong :( ")
                console.log(error)
            }
        })
}

const viewData = () => {
  inquirer
    .prompt(viewQuestions)
    .then(async (answers) => { 
        let results 
        switch(answers.options){
            case "View all departments":
                results = await db.getAllDepartments();
                break;
            case 'View all employees':
                results =  db.getAllEmployees();
                break;
            case  'View all roles':
                results =  db.getAllRoles();
                break;
            case 'View employees by manager':
                results =  db.getEmployeesByManager();
                break;
            case 'View employees by department':
                results =  db.getEmployeesByDepartment();
                break;
            case 'View department budgets':
                results =  db.getDepartmentBudget();
                break;
        }
        //console log the results in a pretty format
        console.table(results);
        init();
    })       
    .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
                console.log("Sorry something went wrong :( ")
                console.log(error)
            }
        })    
}

const addData = () => {
  inquirer
  .prompt(addQuestions)
  .then((answers) => { 
      let results
      switch(answers.options){
          case 'Add a department':
            inquirer
                .prompt([{
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is the departments\'s name?'
                }])
                .then((answer) => {
                    results =  db.createDepartments(answer.departmentName);
                    console.log(`successfully created department ${results}`)
                })
            break;
          case 'Add employee':
              let firstName;
              let lastName;
              let role;
              let manager;
            inquirer
                .prompt([{
                    type: 'input',
                    name: 'employeeName',
                    message: 'What is the employee\'s first name?'
                }])
                .then(async (answer) => {
                    firstName = answer.employeeName;
                    inquirer
                        .prompt([{
                            type: 'input',
                            name: 'employeeName',
                            message: 'What is the employee\'s last name?'
                        }])
                        .then(async (answer) => {
                            lastName = answer.employeeName;
                            console.table(await db.getAllRoles());
                            inquirer
                                .prompt([{
                                    type: 'input',
                                    name: 'employeeRole',
                                    message: 'What is the employee\'s role?'
                                }])
                                .then(async (answer) => {
                                    role = answer.employeeRole;
                                    console.table(await db.getAllManagers());
                                    inquirer
                                        .prompt([{
                                            type: 'input',
                                            name: 'employeeManager',
                                            message: 'What is the employee\'s manager?'
                                        }])
                                        .then(async (answer) => {
                                            manager = answer.employeeManager;
                                            result = await db.createEmployee(firstName, lastName, role, manager);
                                            console.log(`successfully created employee ${result}`)
                                        })
                                })
                        })
                })
            break;
          case  'Add role':
            results =   db.createRole();
            break;
      }
      //console log the results in a pretty format
      console.table(results);
   })       
   .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
            console.log("Sorry something went wrong :( ")
            console.log(error)
        }
    })    
}


const updateData = () => {

}

const deleteData = () => {

}

const createEmployee = () => {

}

const createRole = () => {

}





const init2 = async () => { 
    const results = await db.getAllDepartments();

    console.log(results);
}

init();