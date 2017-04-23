const cron = require('../../lib/cron')

// set cron task
cron.createJob('0 0 9,12,18 * * *', require('./question'))
