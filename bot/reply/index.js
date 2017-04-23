const twitter = require('../../lib/twitter').getClient()
const translateApi = require('../../lib/translate')

const { yontaku } = require('../question')
const { checkAnswer } = require('../answer')
const { AT_ACCOUNT_NAME, OPTION_NUMBERS } = require('../constants')
const { isEmptyReply, isAnswerReply } = require('./classifier')
const { removeAccountName } = require('../formatter')

twitter.selfMentionStream.on('data', (data) => {

  let replyCreator
  if(isEmptyReply(data.text)) {
    replyCreator = yontaku()
  } else if(isAnswerReply(data.text)) {
    replyCreator = checkAnswer(removeAccountName(data.text), data.in_reply_to_status_id_str)
  } else {
    replyCreator = Promise.reject('Input error')
  }

  replyCreator
    .then(reply => `@${data.user.screen_name} ${reply}`)
    .then(tweet => twitter.tweetTo(tweet, data.id_str))
    .catch(err => console.error('Failed to reply: ', err))
})
