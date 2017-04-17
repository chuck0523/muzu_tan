module.exports = (mongoose) => {
  return {
    Word: require('./word')(mongoose)
  }
}
