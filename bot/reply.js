const twitter = require('../lib/twitter').getClient()
const { Word } = require('../models')
const translateApi = require('../lib/translate')

const translate = (text) => {
  return translateApi.toEn(text)
    .then(res => `${text}の意味は【${res.text}】だよ`)
}

const classifyReply = (text, isReply) => {
  if(!isReply && text === "") {
    return 'question'
  }
  if(isReply && ['1', '2', '3', '4'].includes(text)) {
    return 'answer'
  }
  if(text.split(" ").length === 1) {
    return 'translate'
  }
  return new Error('input error')
}

twitter.selfMentionStream.on('data', (data) => {
  const text = data.text.replace("@muzu_tan", "").trim()
  const questionIdStr = data.in_reply_to_status_id_str
  const isReply = questionIdStr !== null

  const replayCreator = {
    question: require('./question').yontaku(),
    answer: require('./answer').checkAnswer(text, questionIdStr),
    translate: translate(text),
  }

  replayCreator[classifyReply(text, isReply)]
    .then(reply => `@${data.user.screen_name} ${reply}`)
    .then(tweet => twitter.tweetTo(tweet, data.id_str))
    .then(res => console.log(`Successfully reply to: ${data.user.name}`))
    .catch(err => console.error(`Failed to reply: ${err}`))
})
