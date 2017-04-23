// TODO: Due to API limit, make this cron task

const twitter = require('../../lib/twitter').getClient()
const { ACCOUNT_ID_STRING } = require('../constants')

twitter.userStream.on('follow', (data) => {

  // @muzu_tan's follow event
  if(data.source.id_str === ACCOUNT_ID_STRING) {
    return
  }

  // already following
  if(data.source.following) {
    console.log('already following')
    return
  }

  twitter.follow(data.source.id_str)
    .then(res => console.log(`Successfully followed back: ${res.name}`))
    .catch(err => console.err('Failed to follow back: ', err))
})
