const app = require('../app')
const cron = require('../lib/cron')
const twitter = require('../lib/twitter').initClient(app.get('options'))

const mongoose = require('../lib/mongo').connect(app.get('options'))
const { Word } = require('../models')(mongoose)

// activate bot
require('../bot')(Word, twitter, cron)
