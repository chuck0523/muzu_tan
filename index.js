const options = require('./app').get('options')

// tool setup
require('./lib/twitter').initClient(options)
require('./lib/mongoose').createConnection(options)

// activate bot
require('./bot')

// activate mailer
require('./mailer')
