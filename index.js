// Packages required for application
const inquirer = require('inquirer');
const fs = require('fs');

// Function to generate the license badge
function generateLicense(license) {
    let licenseBadge = {
        MIT: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        APACHE: '[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
        GPL: '[![License: GPL 3.0](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
        BSD: '[![License: BSD 3](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
        None: ''
    }
    // Return license badge dependent on user selection
    return licenseBadge[license.split(" ")[0]];
}

// Generate the README.md file and populate with user input from Inquirer
const gennerateReadme = ({projectTitle,githubUser,description,installDep,usageInstruct,license,repoContrib,testCommand,email}) =>
`# ${projectTitle}
${generateLicense(license)}
## Description
${description}
## Table of Contents
1. [Installation](#installation)
1. [Usage](#usage)
1. [License](#license)
1. [Contribution](#contribution)
1. [Testing](#testing)
1. [Questions](#questions)
## Installation
To run this application, you must run command '${installDep}' to install dependencies.
## Usage
${usageInstruct}
## License
The product is licensed under the ${license} license.
## Contribution
${repoContrib}
## Testing
To test the application, you must run the '${testCommand}' command.
## Questions
### Where can I find the repo?
Follow the link: [https://github.com/${githubUser}](https://github.com/${githubUser})
### How can I contact the creator if I have questions?
Contact via email: [${email}](mailto:${email})`;

// Inquirer questions to ask user
inquirer
    .prompt([
        {
            type: 'input',
            name: 'githubUser',
            message: 'What is your GitHub username?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
        {
            type: 'input',
            name: 'projectTitle',
            message: 'What is your project called?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description for your project:',
        },
        {
            type: 'list',
            name: 'license',
            message: 'What kind of license should your project have?',
            choices: ['MIT','APACHE 2.0','GPL 3.0','BSD 3','None'],
        },
        {
            type: 'input',
            name: 'installDep',
            message: 'What command should be run to install dependencies?',
            default: 'npm i',
        },
        {
            type: 'input',
            name: 'testCommand',
            message: 'What command should be run to run tests?',
            default: 'npm test',
        },
        {
            type: 'input',
            name: 'usageInstruct',
            message: 'How do you use your application?',
        },
        {
            type: 'input',
            name: 'repoInstruct',
            message: 'What does the user need to know about using the repo?',
        },
        {
            type: 'input',
            name: 'repoContrib',
            message: 'What does the user need to know about contributing to the repo?',
        },
    ])
    // After entering all of users input
    .then((answers) => {

        const readmeContent = gennerateReadme(answers);

        fs.writeFile('README.md', readmeContent, (err) =>
        err ? console.log(err) : console.log('Successfully generated README file')
        );
    });