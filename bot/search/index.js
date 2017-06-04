const twitter = require('../../lib/twitter').getClient()
const { sample } = require('../../lib/util')

const searchEnglishTopic = () => {
  return twitter.searchTweets(sample(['TOEIC900', 'TOEIC高得点', '難しい英単語', '英語上級者']), 1)
    .catch(err => console.error('Failed to search english topics: ', err))
}

module.exports = {
  searchEnglishTopic,
}
