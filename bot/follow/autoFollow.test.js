const { AUTO_FOLLOW_KEYWORDS, randomKeyword } = require('./autoFollow')

test('Get random keyword', () => {
  expect(AUTO_FOLLOW_KEYWORDS.includes(randomKeyword())).toBeTruthy()
})
