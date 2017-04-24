const { Log } = require('../../models')

// TODO: Due to API limit, make this cron task

const twitter = require('../../lib/twitter').getClient()
const { ACCOUNT_ID_STRING } = require('../constants')

twitter.userStream.on('follow', (data) => {

  // @muzu_tan's follow event
  if(data.source.id_str === ACCOUNT_ID_STRING) {
    return
  }

  Log.saveFollowedLog(`${data.source.name}(@${data.source.screen_name})`)

  // already following
  if(data.source.following) {
    return
  }

  twitter.follow(data.source.id_str)
    .then(res => Log.saveFollowingLog(`${res.name}(@${res.screen_name})`))
    .catch(err => console.error('Failed to follow back: ', err))
})
