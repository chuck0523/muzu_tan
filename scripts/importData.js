const { promisify } = require('util')
const readFile = promisify(require('fs').readFile)
const exec = promisify(require('child_process').exec)

readFile('database.json', 'utf8')
  .then(JSON.parse)
  .then(data => `mongoimport -h ds161960.mlab.com:61960 -d ${data.MONGO_ACCOUNT_NAME} -c words -u ${data.MONGO_USER_NAME} -p ${data.MONGO_PASSWORD} --file ./data/words.json`)
  .then(exec)
  .catch(console.error)
