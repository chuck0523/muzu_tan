const express = require('express')
const app = express()

const {
  TWIBOT_TWITTER_KEY, TWIBOT_TWITTER_SECRET,
  TWIBOT_TWITTER_TOKEN, TWIBOT_TWITTER_TOKEN_SECRET,
  MONGO_USER_NAME, MONGO_PASSWORD,
  PORT
} = process.env

const options = {
  consumer_key: TWIBOT_TWITTER_KEY,
  consumer_secret: TWIBOT_TWITTER_SECRET,
  access_token_key: TWIBOT_TWITTER_TOKEN,
  access_token_secret: TWIBOT_TWITTER_TOKEN_SECRET,
  mongo_user_name: MONGO_USER_NAME,
  mongo_password: MONGO_PASSWORD,
}
app.set('options', options)

app.set('port', (PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.send('This is Twitter-bot application.')
})

app.listen(app.get('port'), () => {
  console.log(`Node app is running at localhost: ${app.get('port')}`)
})

module.exports = app
