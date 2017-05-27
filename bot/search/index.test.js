const { searchEnglishTopic } = require('./index')

test('Search english topics', () => {
  return searchEnglishTopic()
    .then(tweets => expect(tweets).toHaveProperty('statuses'))
})
