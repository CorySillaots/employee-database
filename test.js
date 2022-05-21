// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateHTML  = require('../utils/generateHTML')
const fs = require('fs'); 

const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const Employee = require("../lib/Employee");

const employeesArray = [];


// TODO: Create an array of questions for user input
const initialQuestions = [  
 //Manager
    {
    type: 'input',
    name: 'managerName',
    message: 'Please enter the manager\'s name.'
  },
  {
    type: 'input',
    name: 'managerId',
    message: 'Please enter the manager\'s id?'
  },
    {
    type: 'input',
    name: 'managerEmail',
    message: 'Please enter the managers email.'
  },
    {
    type: 'input',
    name: 'managerOffice',
    message: 'Please enter the managers office number.'
  },
  {
    type: 'list',
    name: 'build',
    message: "Do you want to add an engineer, intern, or finish building?",  
    choices: ["Engineer", "Intern", "Finish"] 
  },
]
// Role select
const engineerQuestions = [
    {
        type: 'input',
        name: 'engineerName',
        message: 'Please enter the engineer\'s name.'
      },
    {
        type: 'input',
        name: 'engineerId',
        message: 'Please enter the engineer\'s ID.'
      },
    {
        type: 'input',
        name: 'engineerEmail',
        message: 'Please enter the engineer\'s email.'
      },
    {
        type: 'input',
        name: 'engineerGithub',
        message: 'Please enter the engineer\'s Github user name.'
      },
      {
        type: 'list',
        name: 'build',
        message: "Do you want to add an engineer, intern, or finish building?",  
        choices: ["Engineer", "Intern", "Finish"] 
      },
];

const internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: 'Please enter the intern\'s name.'
      },
    {
        type: 'input',
        name: 'internId',
        message: 'Please enter the intern\'s ID.'
      },
    {
        type: 'input',
        name: 'internEmail',
        message: 'Please enter the intern\'s email.'
      },
    {
        type: 'input',
        name: 'internSchool',
        message: 'Please enter the intern\'s school.'
      },
      {
        type: 'list',
        name: 'build',
        message: "Do you want to add an engineer, intern, or finish building?",  
        choices: ["Engineer", "Intern", "Finish"] 
      },
];
  
// TODO: Create a function to initialize app
function init() {

console.log("\n Welcome to build-a-team! \n")
    inquirer
        .prompt(initialQuestions)
        .then((answers) => { 

          const manager = new Manager(
            answers.managerName,
            answers.managerId,
            answers.managerEmail,
            answers.managerOffice
          );

          employeesArray.push(manager);

            switch(answers.build) {
            case "Engineer":
                getEngineer();
                break;
            
            case "Intern":
                getIntern();
                break;
            
            case "Finish":
                finish();
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
        });
}

// Engineer
function getEngineer() {
    inquirer
        .prompt(engineerQuestions)
        .then((answers) => {

          const engineer = new Engineer(
            answers.engineerName,
            answers.engineerId,
            answers.engineerEmail,
            answers.engineerGithub
          );

          employeesArray.push(engineer);

            switch(answers.build) {
            case "Engineer":
                getEngineer();
                break;
            
            case "Intern":
                getIntern();
                break;
            
            case "Finish":
                finish();
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
        });
}

// Intern
function getIntern() {
        inquirer
            .prompt(internQuestions)
            .then((answers) => {

              const intern = new Intern(
                answers.internName,
                answers.internId,
                answers.internEmail,
                answers.internSchool
              );

              employeesArray.push(intern);

                switch(answers.build) {
                case "Engineer":
                    getEngineer();
                    break;
                
                case "Intern":
                    getIntern();
                    break;
                
                case "Finish":
                    finish();
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
            });
}

function finish() {
  const HTML = generateHTML(employeesArray)
  writeToFile("./dist/index.html", HTML)
};

// TODO: Create a function to write HTML file
function writeToFile(filename, data){
  fs.writeFile(filename, data, function(err, result){
    if (err) console.log('error', err);
  })
}

// Function call to initialize app
init();
