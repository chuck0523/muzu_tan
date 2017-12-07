const { AT_ACCOUNT_NAME, OPTION_NUMBERS } = require('../constants')
const { yontaku } = require('../lib/question')
const { checkAnswer } = require('../lib/answer')
const { removeAccountName, pickNumber } = require('../lib/formatter')
const { ReplyLog } = require('../../models')

const isEmptyReply = (reply) => {
  return reply.trim() === AT_ACCOUNT_NAME
}
const isAnswerReply = (reply) => {
  const text = reply.replace(AT_ACCOUNT_NAME, '').trim()
  return OPTION_NUMBERS.includes(text) || OPTION_NUMBERS.includes(pickNumber(text))
}

module.exports.replyCreator = (reply, tweetId) => {
  if(isEmptyReply(reply)) {
    return yontaku()
  } else if(isAnswerReply(reply)) {
    return checkAnswer(removeAccountName(reply), tweetId)
  } else {
    return Promise.reject('Input error')
  }
}

module.exports.loggerCreator = (reply) => {
  if(isEmptyReply(reply)) {
    return ReplyLog.saveEmptyReply
  } else if(isAnswerReply(reply)) {
    return ReplyLog.saveAnswerReply
  } else {
    return ReplyLog.saveOtherReply
  }
}

// for tests
module.exports.isEmptyReply = isEmptyReply
module.exports.isAnswerReply = isAnswerReply
