const { Word } = require('../models')

module.exports.yontaku = () => {
  return Word.findRandom4()
    .then(words => {
      const answer = words[Math.floor(Math.random() * 4)]
      return `
        [問題] ${answer.name}の意味は？
        1.${words[0].meaning}
        2.${words[1].meaning}
        3.${words[2].meaning}
        4.${words[3].meaning}
      `
    })
}
