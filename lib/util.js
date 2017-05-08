module.exports.getRandomNumbers = ({ max, size }) => {
  let nums = []
  
  while(nums.length < size) {
    const random = Math.floor(Math.random() * max)
    if(nums.length === 0 || nums[nums.length - 1] !== random) {
      nums.push(random)
    }
  }
  
  return nums
}