module.exports = (Word, twitter, cron) => {
  require('./autoUnfollow')(twitter, cron)
  require('./followBack')(twitter)
  require('./randomTweet')(Word, twitter, cron)
  require('./replyQuestion')(Word, twitter)
}
