#!/usr/bin/env node

const path = require('path')
const exists = require('fs').existsSync
const chalk = require('chalk')
const inquirer = require('inquirer')
const program = require('commander')
const generate = require('../lib/generate')

program.usage('<project-name>')

program.on('--help', function () {
  console.log(' Examples:')
  console.log()
  console.log(chalk.gray('  # create a new project'))
  console.log('  $ ginkgo init my-project')
  console.log()
});

(function() {
  program.parse(process.argv)  
  if (program.args.length < 1) {
    return program.help()
  }
  const projectName = program.args[0]
  const projectPath = path.resolve(projectName)

  if (!exists(projectPath)) {
    run(projectPath)
  } else {
    inquirer.prompt([{
      type: 'confirm',
      message: 'Target directory exists. Continue?',
      name: 'ok'
    }])
    .then(function(answers) {
      if (answers.ok) {
        run(projectPath)
      }
    })
  }

  function run (projectPath) {
    generate.createProject(projectPath)
  }
})()