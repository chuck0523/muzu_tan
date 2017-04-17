const Promise = require('bluebird')
const readFile = Promise.promisify(require('fs').readFile)
const exec = Promise.promisify(require('child_process').exec)

readFile('database.json', 'utf8')
  .then(data => JSON.parse(data))
  .then(data => `mongoimport -h ds161960.mlab.com:61960 -d ${data.MONGO_ACCOUNT_NAME} -c words -u ${data.MONGO_USER_NAME} -p ${data.MONGO_PASSWORD} --file ./data/words.json`)
  .then(exec)
  .catch(console.error)
