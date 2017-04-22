const app = require('../app')
const cron = require('../lib/cron')
const twitter = require('../lib/twitter').initClient(app.get('options'))

require('../lib/mongoose').createConnection(app.get('options'))

// activate bot
require('../bot')(twitter, cron)
