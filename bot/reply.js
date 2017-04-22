const { Word } = require('../models')
const translateApi = require('../lib/translate')

const question = () => {
  return Word.findRandom()
    .then(word => `${word.name}の意味は【${word.meaning}】だよ`)
    .catch(err => `Failed to get random word`)
}

const answer = (answer) => {
  return
}

const translate = (text) => {
  return translateApi.toEn(text)
    .then(res => `${text}の意味は【${res.text}】だよ`)
}

const resolveText = (text) => {
  if(text === "") {
    return 'question'
  }

  if([1, 2, 3, 4].includes(text)) {
    return 'answer'
  }
  if(text.split(" ").length === 1) {
    return 'translate'
  }
  return new Error('input error')
}

module.exports = (twitter) => {
  twitter.selfMentionStream.on('data', (data) => {
    const text = data.text.replace("@muzu_tan", "")

    const replays = {
      question: question(),
      answer: answer(),
      translate: translate(text),
    }

    replays[resolveText(text)]
      .then(reply =>
        twitter.tweetTo(`@${data.user.screen_name} ${reply}`, data.id_str)
          .then(res => console.log(`Successfully reply to: ${data.user.name}`))
          .catch(err => console.error(`Failed to reply: ${err}`))
      )
      .catch(console.error)
  })
}
