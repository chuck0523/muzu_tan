const { sendHtmlMail } = require('../lib/mailer')
const { FollowLog } = require('../models')

module.exports = () => {
  FollowLog.getYesterdayLogs()
    .then(logs => {
      let followed = [], searched = []

      // TODO: html generator maybe

      logs.forEach(log => {
        if(log.direction === 1) {
          followed.push(`<li>${log.account}</li>`)
        } else if(log.follow_type === 0) {
          searched.push(`<li><b>${log.account}</b><br /> ${log.search_result}</li>`)
        }
      })

      sendHtmlMail({ subject: 'test', html: `
        <h1>Daily Follow Report</h1>
        <h2>Followed by accounts below</h2>
        <ul>${followed.join('')}</ul>
        <br />
        <h2>Searched and followed these accounts</h2>
        <ul>${searched.join('')}</ul>
      ` })
    })
}
