const twitter = require('../../lib/twitter').getClient()
const translateApi = require('../../lib/translate')
const classifier = require('./classifier')

twitter.selfMentionStream.on('data', (data) => {
  const account = `${data.user.name}(@${data.user.screen_name})`

  classifier.replyCreator(data.text, data.in_reply_to_status_id_str)
    .then(reply => `@${data.user.screen_name} ${reply}`)
    .then(tweet => twitter.tweetTo(tweet, data.id_str))
    .catch(err => console.error('Failed to reply: ', err))

  classifier.loggerCreator(data.text)(account)
})
