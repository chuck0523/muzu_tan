module.exports = (twitter) => {
  const userStream = twitter.stream('user')

  userStream.on('follow', (data) => {
    twitter.follow(data.source.id_str)
      .then(res => console.log(`Successfully followed back: ${res.name}`))
      .catch(error => console.error(`Failed to folllow back: ${error}`))
  })
}
