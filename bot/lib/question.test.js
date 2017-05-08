const question = require('./question')

test('Generate yontaku', () => {
  return question.yontaku()
    .then(q => expect(q.length).toBeGreaterThan(0))
})
