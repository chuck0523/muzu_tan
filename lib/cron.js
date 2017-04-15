const CronJob = require('cron').CronJob

module.exports.createJob = (cronTime, job) => {
  new CronJob({
    cronTime,
    onTick: () => job(),
    start: true,
  })
}
