// NOTE: still under development

module.exports = (Word, twitter, cron) => {
  const tweetTime = '0 0 0-14 * * *'

  const tweet = () => {
    console.log('Start to tweet a random word.')
    Word.findRandom()
    .then(word => {
      twitter.tweet(`ランダム英単語【${word.name}】: ${word.meaning}`)
        .then(tweet => console.log(`${tweet} was successfully tweeted.`))
        .catch(error => console.error(`Failed to tweet ${tweet}.`))
    })
  }

  // set cron task
  cron.createJob(tweetTime, tweet)
}
