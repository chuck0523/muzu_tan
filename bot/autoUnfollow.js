module.exports = (twitter, cron) => {
  const unfollowTime = '0 30 0-14 * * *'

  const unfollow = () => {
    console.log('Start to search who to unfollow')
    twitter.getAllFollowers()
      .then(({ users }) => {
        const user = users.find(user => !user.live_following)
        if(user === undefined) {
          console.log('There\'s no users to unfollow')
          return
        }
        twitter.unfollow(user.id_str)
        console.log(`Successfully unfollow: ${user.name}`)
      })
      .catch(error => console.error(`Failed to unfolllow: ${error}`))
  }

  // set cron job
  cron.createJob(unfollowTime, unfollow)
}
