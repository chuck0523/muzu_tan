module.exports = (Word, twitter) => {
  twitter.selfMentionStream.on('data', (data) => {
    console.log(`Detected mention by ${data.user.name}`)
    Word.findRandom()
      .then(word => {
          twitter.tweetTo(`@${data.user.screen_name} ${word.name}の意味は${word.meaning}だよ`, data.id_str)
            .then(res => console.log(`Successfully reply question to: ${data.user.name}`))
            .catch(err => console.error(`Failed to reply question: ${err}`))
      })
  })
}
