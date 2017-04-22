const { Word } = require('../models')

module.exports.yontaku = () => {
  return Word.findRandom4()
    .then(words => {
      const answer = words[Math.floor(Math.random() * 4)]
      return `${answer.name}の意味はどれでしょう？\n` +
        `(1) ${words[0].meaning}\n` +
        `(2) ${words[1].meaning}\n` +
        `(3) ${words[2].meaning}\n` +
        `(4) ${words[3].meaning}\n` +
        `1, 2, 3, 4のどれかでお答えください`
    })
}
