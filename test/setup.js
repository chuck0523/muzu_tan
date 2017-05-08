// this script is called before Jest test
require('dotenv').config()
require('../lib/twitter').initClient()
require('../lib/mongoose').createConnection()

