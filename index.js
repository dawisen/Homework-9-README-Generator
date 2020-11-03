const inquirer = require("inquirer");
const util = require("util");
const fs = require('fs');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      name: "github",
      message: "Enter your GitHub Username",
    },
    {
      name: "questions",
      message: "What is your email address?",
    },
    {
      name: "title",
      message: "What is your project's name?",
    },
    {
      name: "description",
      message: "Provide a short description for your project",
    },
    {
      name: "instructions",
      message: "What commands do you run to install dependencies?",
    },
    {
      name: "usage",
      message: "What do users need to know about using the repo?",
    },
    {
      name: "contributing",
      message: "What do users need to know about contributing to the repo?",
    },
    {
      type: "list",
      message: "Select your project license",
      name: "license",
      choices: [
        new inquirer.Separator("Select an answer using the arrow keys"),
        {
          name: "Academic",
        },
        {
          name: "MIT",
        },
        {
          name: "Apache",
        },
        {
          name: "GNU",
        },
        {
          name: "None",
        },
      ],
      validate: function (answer) {
        if (answer.length < 1) {
          return "You must choose one.";
        }

        return true;
      },
    },
    {
      name: "tests",
      message: "What command do you use to run tests?",
    },
  ]);
};

const generateREADME = (answers) => {
  return `
  # ${answers.title}
  ## Table of Contents
    * Description
    * Installation
    * Usage
    * License(s)
    * Contributions
    * Testing
    * Questions
  ## Description:
    ${answers.description}
  ## Installation
    To install, run the following command: <addr>${answers.instructions}<addr>
  ## Usage
    To use this repository you need ${answers.usage}.
  ## License
    [![License]${JSON.stringify(answers.license)}
  ## Contributions
    ${answers.contributing}
  ## Tests
    Run tests with the command <addr>${answers.tests}<addr>
  ## Questions
    If you have any questions or issues please email me at ${answers.questions}
    My GitHub profile [GitHub]/${answers.github}
  `;
};

promptUser()
  .then((answers) => {
      const readme = generateREADME(answers);
      console.log(answers);

    return writeFileAsync("README.md", readme);
  })
  .then(() => {
    console.log("Creating README...");
  })
  .catch((err) => console.log(err));
