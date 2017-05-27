// this script is called before Jest test
require('dotenv').config()
require('../lib/mongoose').createConnection()
require('../lib/twitter').initClient()
