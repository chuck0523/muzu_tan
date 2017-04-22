const app = require('../app')

require('../lib/twitter').initClient(app.get('options'))
require('../lib/mongoose').createConnection(app.get('options'))

// activate bot
require('../bot')
