const chalk = require('chalk')
const format = require('util').format

const prefix = 'ginkgo-cli '
const sep = '.'

module.exports.fatal = function (message) {
  if (message instanceof Error) {
    message = message.message.trim()
  }
  const msg = format.apply(format, arguments)
  console.log(chalk.red(prefix), sep, msg)
  process.exit(1)
}

module.exports.success = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, msg)
}

module.exports.log = function () {
  const msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, msg)
}