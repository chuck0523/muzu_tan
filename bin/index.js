const app = require('../app')
const cron = require('../lib/cron')
const twitter = require('../lib/twitter').initClient(app.get('options'))

require('../lib/mongo').createConnection(app.get('options'))
const { Word } = require('../models')

// activate bot
require('../bot')(Word, twitter, cron)
