require('dotenv').config()

require('./app')

// tool setup
require('./lib/twitter').initClient()
require('./lib/mongoose').createConnection()

// activate bot
require('./bot')

// activate mailer
require('./mailer')
