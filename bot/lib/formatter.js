const { AT_ACCOUNT_NAME, ZENKAKU_OPTION_NUMBERS } = require('./../constants')

module.exports.removeAccountName = (text) => {
  return text.replace(AT_ACCOUNT_NAME, '').trim()
}

/*
* Convert Zenkaku number to Hankaku number
*  @params c<string>
*  @return <string>: Hankaku number in string type
*/
const toHankaku = (c) => {
  if(ZENKAKU_OPTION_NUMBERS.includes(c)) {
    return String.fromCharCode(c.charCodeAt(0)-0xFEE0)
  }
  return c
}
module.exports.toHankaku = toHankaku

/*
*  @params text<string>
*  @return number<string>
*/
module.exports.pickNumber = (text) => {
  const number = text.split('').map(toHankaku).find(c => !isNaN(parseInt(c, 10)))
  if(number === undefined) {
    return Promise.reject('Text doesn\'t contain any number')
  }
  return number
}

// Question format example:
// @hogehoge 【shenanigan】の意味はどれでしょう？\n(1) 均衡\n(2) いたずら、悪ふざけ\n(3) 黙想、熟考、熟視、計画\n(4) いたずら、悪ふざけ\n1, 2, 3, 4のどれかでお答えください

module.exports.sliceQuestion = (text) => {
  if(text.match(/\【.+?\】/g) == null) {
    return Promise.reject('Couldn\'t find question word')
  }
  return text.match(/\【.+?\】/g)[0].slice(1, -1)
}
module.exports.sliceOptions = (text) => {
  if(text.split('\n').length !== 6) { // question should have 5 line breaks
    return Promise.reject('Couldn\'t find question options')
  }
  return text.split('\n').slice(1, -1).map(q => q.slice(4)) // 4 = length of '(1) '
}
