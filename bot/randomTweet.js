const { Word } = require('../models')

module.exports = (twitter, cron) => {
  const tweetTime = '0 0 0-14 * * *'

  const tweet = () => {
    Word.findRandom()
      .then(word => `【${word.name}】: ${word.meaning} #ランダム英単語`)
      .then(twitter.tweet)
      .then(tweet => console.log(`${tweet} was successfully tweeted.`))
      .catch(error => console.error(`Failed to tweet: ${error}.`))
  }

  // set cron task
  cron.createJob(tweetTime, tweet)
}
