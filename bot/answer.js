const twitter = require('../lib/twitter').getClient()
const { Word } = require('../models')


const toHankaku = (number) => {
  if(['１', '２', '３', '４'].includes(number)) {
    return String.fromCharCode(number.charCodeAt(0)-0xFEE0)
  }
  return number
}

// Question format example:
// @hogehoge 【shenanigan】の意味はどれでしょう？\n(1) 均衡\n(2) いたずら、悪ふざけ\n(3) 黙想、熟考、熟視、計画\n(4) いたずら、悪ふざけ\n1, 2, 3, 4のどれかでお答えください

const sliceQuestion = (text) => {
  return text.match(/\【.+?\】/g)[0].slice(1, -1)
}
const sliceOptions = (text) => {
  return text.split('\n').slice(1, -1).map(q => q.slice(4))
}

module.exports.checkAnswer = (_number, tweetId) => {
  const number = toHankaku(_number)
  return twitter.getTweet(tweetId)
    .then(({ text }) => {
      return Promise.all([
        // answer word
        Word.findByName(sliceQuestion(text)),
        // selected word
        Promise.resolve(sliceOptions(text)[number - 1])
      ])
    })
    .then(words => { // words => [answer, selected]
      if(words[0].meaning === words[1]) {
        return '正解です！'
      } else {
        return `残念！${words[0].name}の意味は【${words[0].meaning}】でした`
      }
    })
    .catch(err => console.error('Failed to check answer: ', err))
}
