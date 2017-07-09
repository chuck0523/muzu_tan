const randomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

const getRandomNumbers = ({ max, size }) => {
  let nums = []

  while(nums.length < size) {
    const random = randomNumber(max)
    // All numbers must be unique
    if(!nums.includes(random)) {
      nums.push(random)
    }
  }

  return nums
}

const sample = (ary) => {
  return ary[randomNumber(ary.length)]
}

module.exports = {
  randomNumber, getRandomNumbers, sample,
}
