const twitter = require('../../lib/twitter').getClient()
const { Word } = require('../../models/index')
const { ZENKAKU_OPTION_NUMBERS } = require('./../constants')
const { sliceQuestion, sliceOptions} = require('./formatter')

const toHankaku = (number) => {
  if(ZENKAKU_OPTION_NUMBERS.includes(number)) {
    return String.fromCharCode(number.charCodeAt(0)-0xFEE0)
  }
  return number
}

module.exports.checkAnswer = (number, tweetId) => {
  return twitter.getTweet(tweetId)
    .then(({ text }) => {
      return Promise.all([
        // answer word
        Word.findByName(sliceQuestion(text)),
        // selected word
        Promise.resolve(sliceOptions(text)[toHankaku(number) - 1])
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
