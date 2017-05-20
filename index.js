require('dotenv').config()

require('./server')

// tool setup
require('./lib/twitter').initClient()
require('./lib/mongoose').createConnection()

// activate bot
require('./bot')

// activate mailer
require('./mailer')
