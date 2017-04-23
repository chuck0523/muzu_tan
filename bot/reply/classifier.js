const { AT_ACCOUNT_NAME, OPTION_NUMBERS } = require('../constants')

module.exports.isEmptyReply = (reply) => {
  return reply.trim() === AT_ACCOUNT_NAME
}
module.exports.isAnswerReply = (reply) => {
  const text = reply.replace(AT_ACCOUNT_NAME, '').trim()
  return OPTION_NUMBERS.includes(text)
}
