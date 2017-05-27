const { randomNumber, getRandomNumbers, sample } = require('./util')

test('Get random number in correct range', () => {
  expect(randomNumber(3)).toBeLessThanOrEqual(3)
  expect(randomNumber(3)).toBeGreaterThanOrEqual(0)
})

test('Get sample item of array', () => {
  expect([1, 2, 3].includes(sample([1, 2, 3]))).toBeTruthy()
})
