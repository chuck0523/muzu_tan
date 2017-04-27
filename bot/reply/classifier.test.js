const classifiler = require('./classifier')
const { AT_ACCOUNT_NAME, OPTION_NUMBERS } = require('../constants')
const { yontaku } = require('../lib/question')
const { checkAnswer } = require('../lib/answer')
const { ReplyLog } = require('../../models')

test('Classify empty reply', () => {
  expect(classifiler.isEmptyReply(AT_ACCOUNT_NAME)).toBeTruthy()
})
test('Classify not empty reply', () => {
  expect(classifiler.isEmptyReply(AT_ACCOUNT_NAME + 'hoge')).toBeFalsy()
})

test('Classify answer reply', () => {
  expect(classifiler.isAnswerReply(AT_ACCOUNT_NAME + ' ' + OPTION_NUMBERS[0])).toBeTruthy()
})
test('Classify not answer reply', () => {
  expect(classifiler.isAnswerReply(AT_ACCOUNT_NAME + 'hoge')).toBeFalsy()
})
test('Classify not answer reply with invalid option number', () => {
  expect(classifiler.isAnswerReply(AT_ACCOUNT_NAME + ' 5')).toBeFalsy()
})

test('Return yontaku function for empty reply', () => {
  expect(classifiler.replyCreator(AT_ACCOUNT_NAME)).toEqual(yontaku())
})
// should initiate twitter client before test
test.skip('Return check answer function for answer reply', () => {
  expect(classifiler.replyCreator(AT_ACCOUNT_NAME + ' ' + OPTION_NUMBERS[0], '12345')).toEqual(checkAnswer())
})
test('Return error for invalid reply', () => {
  expect(classifiler.replyCreator(AT_ACCOUNT_NAME + 'hoge')).toEqual(Promise.reject('Input error'))
})

test('Return logger for saving empty reply', () => {
  expect(classifiler.loggerCreator(AT_ACCOUNT_NAME)).toEqual(ReplyLog.saveEmptyReply)
})
test('Return logger for saving answer reply', () => {
  expect(classifiler.loggerCreator(AT_ACCOUNT_NAME + ' ' + OPTION_NUMBERS[0])).toEqual(ReplyLog.saveAnswerReply)
})
test('Return logger for saving other reply', () => {
  expect(classifiler.loggerCreator(AT_ACCOUNT_NAME + 'hoge')).toEqual(ReplyLog.saveOtherReply)
})
