const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.send('This is Twitter-bot application.')
})

app.listen(app.get('port'), () => {
  console.log(`Node app is running at port: ${app.get('port')}`)
})

module.exports = app
