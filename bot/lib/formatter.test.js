const formatter = require('./formatter')
const { AT_ACCOUNT_NAME } = require('./../constants')

test('Remove account name', () => {
  expect(formatter.removeAccountName(AT_ACCOUNT_NAME)).toBe('')
})
test('Cannot remove not account name', () => {
  expect(formatter.removeAccountName('hoge')).not.toBe('')
})

test('Shuold pick first found number from string', () => {
  expect(formatter.pickNumber('foobar3baz')).toBe('3')
})
test('Shuold throw error when text doesn\'t contains any number', () => {
  return formatter.pickNumber('foobarbaz')
    .catch(err => expect(err).toBe('Text doesn\'t contain any number'))
})

test('Find question word', () => {
  expect(formatter.sliceQuestion('【shenanigan】の意味はどれでしょう？')).toBe('shenanigan')
})
test('Cannot find question word', () => {
  return formatter.sliceQuestion('hoge')
    .catch(err => expect(err).toBe('Couldn\'t find question word'))
})

const reply = '@hogehoge 【shenanigan】の意味はどれでしょう？\n(1) 均衡\n(2) いたずら、悪ふざけ\n(3) 黙想、熟考、熟視、計画\n(4) いたずら、悪ふざけ\n1, 2, 3, 4のどれかでお答えください'
test('Slice question options', () => {
  expect(formatter.sliceOptions(reply).length).toBe(4)
})
test('Cannot slice question options', () => {
  return formatter.sliceOptions('hoge')
    .catch(err => expect(err).toBe('Couldn\'t find question options'))
})

test('Zenkaku number is converted to Hankaku', () => {
  expect(formatter.toHankaku('１')).toBe('1')
})
test('Hankaku number is not converted', () => {
  expect(formatter.toHankaku('1')).toBe('1')
})
