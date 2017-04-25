const cron = require('../lib/cron')

cron.createJob('0 0 9 * * *', require('./admin'))
