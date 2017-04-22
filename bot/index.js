module.exports = (twitter) => {
  require('./autoUnfollow')(twitter)
  require('./followBack')(twitter)
  require('./randomTweet')(twitter)
  require('./reply')(twitter)
}
