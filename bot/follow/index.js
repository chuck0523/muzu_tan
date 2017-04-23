const cron = require('../../lib/cron')

cron.createJob('0 45 9-19 * * *', require('./autoFollow'))

// TODO: bug
// cron.createJob('0 30 12 * * *', require('./autoUnfollow'))

require('./followBack')
