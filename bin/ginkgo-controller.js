#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const program = require('commander')
const generate = require('../lib/generate')

program.usage('<version> <name>')

program.on('--help', function () {
  console.log(' Examples:')
  console.log()
  console.log(chalk.gray('  # create a new controller'))
  console.log(' $ ginkgo controller v2 my-controller')
  console.log()
});

(function() {
  program.parse(process.argv)
  if (program.args.length !== 2) {
    return program.help()
  }
  const version = program.args[0]
  const name = program.args[1]
  const projectPath = path.resolve('.')
  const versionPath = path.join(projectPath, version)
  const controllerPath = path.join(projectPath, version, name)
  if (!fs.existsSync(versionPath)) {
    fs.mkdirSync(versionPath)
  }

  if (!fs.existsSync(controllerPath)) {
    run(controllerPath)
  } else {
    inquirer.prompt([{
      type: 'confirm',
      message: 'Target controller exists. Continue?',
      name: 'ok'
    }])
    .then(function(answers) {
      if (answers.ok) {
        run(controllerPath)
      }
    })
  }

  function run (controllerPath) {
    generate.createController(controllerPath)
  }
})()