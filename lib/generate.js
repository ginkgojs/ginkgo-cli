const ora = require('ora')
const path = require('path')
const rm = require('rimraf').sync
const fs = require('fs')
const logger = require('./logger')
const download = require('download-git-repo')

const templteRepo = 'ginkgojs/template-project'

exports.createProject = function (projectPath) {
  if (fs.exists(projectPath)) {
    rm(projectPath)
  }
  const spinner = ora('downloading template project')
  spinner.start()
  console.log()
  download(templteRepo, projectPath, function (err) {
    spinner.stop()
    if (err) {
      logger.fatal("Failed to download template repo:" + templteRepo + err.message.trim())
    } else {
      console.log()
      logger.success('Generated "%s"', path.basename(projectPath))  
    }
  })
}

const controllerFiles = [
  'controller.js',
  'hooks.js',
  'router.js',
  'validator.js'
]

exports.createController = function (ctrlPath) {
  const spinner = ora('downloading template project')
  spinner.start()
  console.log(ctrlPath)
  fs.existsSync(ctrlPath) || fs.mkdirSync(ctrlPath)
  controllerFiles.forEach(file => {
    fs.writeFileSync(path.join(ctrlPath, file), '')
  })
  spinner.stop()
}