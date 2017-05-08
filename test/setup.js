// this script is called before Jest test
require('dotenv').config()
require('../lib/mongoose').createConnection()

// TODO: comment out when starting to test twitter features
// require('../lib/twitter').initClient()
