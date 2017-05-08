const question = require('./question')

test('Remove account name', () => {
  return question.yontaku()
    .then(q => expect(q.length).toBeGreaterThan(0))
})
