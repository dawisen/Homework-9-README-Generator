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
      name: "contributors",
      message: "Who contributed to this project?",
    },
    {
      type: "list",
      message: "Select your project license",
      name: "license",
      choices: [
        new inquirer.Separator("Select an answer using the arrow keys"),
        {
          name: "MIT",
          value:
            "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
        },
        {
          name: "Apache",
          value:
            "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
        },
        {
          name: "GNU",
          value:
            "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
        },
        {
          name: "None",
          value: "Unlicensed"
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
  return `# ${answers.title} 
  
${answers.license}

## Description:
${answers.description}

## Table of Contents

* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Testing](#Testing)
* [Questions](#Questions)

## Installation
> ${answers.instructions}
  
## Usage
${answers.usage}.

## License
${answers.license}

## Contributors
${answers.contributors}

## Testing
> ${answers.tests}
  
## Questions
If you have any questions or issues please contact me via [email](${answers.questions})<br>
View my other projects here [${answers.github}](http://github.com/${answers.github})
`;
};

promptUser()
  .then((answers) => {
      const readme = generateREADME(answers);
      console.log(answers);

    return writeFileAsync("README.md", readme);
  })
  .then(() => {
    console.log("README File created");
  })
  .catch((err) => console.log(err));
