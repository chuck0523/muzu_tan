const twitter = require('../lib/twitter').getClient()
const translateApi = require('../lib/translate')

const { yontaku } = require('./question')
const { checkAnswer } = require('./answer')

twitter.selfMentionStream.on('data', (data) => {
  const questionIdStr = data.in_reply_to_status_id_str
  const isReply = questionIdStr !== null

  let replyCreator
  if(!isReply && data.text === '@muzu_tan ') {
    replyCreator = yontaku()
  } else if(isReply && ['1', '１', '2', '２', '3', '３', '4', '４'].includes(data.text)) {
    replyCreator = checkAnswer(data.text, questionIdStr)
  } else {
    replyCreator = Promise.reject('Input error')
  }

  replyCreator
    .then(reply => `@${data.user.screen_name} ${reply}`)
    .then(tweet => twitter.tweetTo(tweet, data.id_str))
    .catch(err => console.error('Failed to reply: ', err))
})
