const twitter = require('../lib/twitter').getClient()
const { Word } = require('../models')

// Question format example:
// @hogehoge 【shenanigan】の意味はどれでしょう？\n(1) 均衡\n(2) いたずら、悪ふざけ\n(3) 黙想、熟考、熟視、計画\n(4) いたずら、悪ふざけ\n1, 2, 3, 4のどれかでお答えください

const sliceQuestion = (text) => {
  return text.match(/\【.+?\】/g)[0].slice(1, -1)
}
const sliceOptions = (text) => {
  return text.split('\n').slice(1, -1).map(q => q.slice(4))
}

module.exports.checkAnswer = (number, tweetId) => {
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
        return '正解!'
      } else {
        return `残念！正解は【${words[0].meaning}】でした`
      }
    })
}
