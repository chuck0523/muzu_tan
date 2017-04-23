// TODO: Due to API limit, make this cron task

const twitter = require('../lib/twitter').getClient()

twitter.userStream.on('follow', (data) => {

  // @muzu_tan's follow event
  if(data.source.id_str === '771649236') { // TODO: Dedifine as constant
    return
  }

  // already following
  if(data.source.following) {
    console.log('already following')
    return
  }

  twitter.follow(data.source.id_str)
    .then(res => console.log(`Successfully followed back: ${res.name}`))
    .catch(error => console.error(`Failed to folllow back: ${error}`))
})
