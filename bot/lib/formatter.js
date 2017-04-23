const { AT_ACCOUNT_NAME } = require('./../constants')

module.exports.removeAccountName = (text) => {
  return text.replace(AT_ACCOUNT_NAME, '').trim()
}

// Question format example:
// @hogehoge 【shenanigan】の意味はどれでしょう？\n(1) 均衡\n(2) いたずら、悪ふざけ\n(3) 黙想、熟考、熟視、計画\n(4) いたずら、悪ふざけ\n1, 2, 3, 4のどれかでお答えください

module.exports.sliceQuestion = (text) => {
  return text.match(/\【.+?\】/g)[0].slice(1, -1)
}
module.exports.sliceOptions = (text) => {
  return text.split('\n').slice(1, -1).map(q => q.slice(4)) // 4 = length of '(1) '
}
