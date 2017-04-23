const twitter = require('../lib/twitter').getClient()
const { Word } = require('../models')
const translateApi = require('../lib/translate')

twitter.selfMentionStream.on('data', (data) => {
  const text = data.text.replace("@muzu_tan", "").trim()
  const questionIdStr = data.in_reply_to_status_id_str
  const isReply = questionIdStr !== null

  let replyCreator;
  if(!isReply && text === "") {
    replyCreator = require('./question').yontaku()
  } else if(isReply && ['1', '１', '2', '２', '3', '３', '4', '４'].includes(text)) {
    replyCreator = require('./answer').checkAnswer(text, questionIdStr)
  } else {
    replyCreator = Promise.reject('Input error')
  }

  replyCreator
    .then(reply => `@${data.user.screen_name} ${reply}`)
    .then(tweet => twitter.tweetTo(tweet, data.id_str))
    .catch(err => console.error(err))
})
