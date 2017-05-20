const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const setApi = require('./api')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

setApi(app)

app.listen(app.get('port'), () => {
  console.log(`Node app is running at port: ${app.get('port')}`)
})

module.exports = app
