const { Word } = require('../models')

module.exports.yontaku = () => {
  return Word.findRandom4()
    .then(words => {
      const answer = words[Math.floor(Math.random() * 4)]
      return `[問題] ${answer.name}の意味は？\n` +
        `1.${words[0].meaning}\n` +
        `2.${words[1].meaning}\n` +
        `3.${words[2].meaning}\n` +
        `4.${words[3].meaning}`
    })
}
