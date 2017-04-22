module.exports = (twitter, cron) => {
  require('./autoUnfollow')(twitter, cron)
  require('./followBack')(twitter)
  require('./randomTweet')(twitter, cron)
  require('./reply')(twitter)
}
