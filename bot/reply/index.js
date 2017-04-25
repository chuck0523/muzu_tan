const twitter = require('../../lib/twitter').getClient()
const translateApi = require('../../lib/translate')
const { ReplyLog } = require('../../models')

const { yontaku } = require('../lib/question')
const { checkAnswer } = require('../lib/answer')
const { isEmptyReply, isAnswerReply } = require('./classifier')
const { removeAccountName } = require('../lib/formatter')

twitter.selfMentionStream.on('data', (data) => {
  const account = `${data.user.name}(@${data.user.screen_name})`

  let replyCreator, logger
  if(isEmptyReply(data.text)) {
    replyCreator = yontaku()
    logger = ReplyLog.saveEmptyReply
  } else if(isAnswerReply(data.text)) {
    replyCreator = checkAnswer(removeAccountName(data.text), data.in_reply_to_status_id_str)
    logger = ReplyLog.saveAnswerReply
  } else {
    replyCreator = Promise.reject('Input error')
    logger = ReplyLog.saveOtherReply
  }

  replyCreator
    .then(reply => `@${data.user.screen_name} ${reply}`)
    .then(tweet => twitter.tweetTo(tweet, data.id_str))
    .catch(err => console.error('Failed to reply: ', err))

  logger(account)
})
