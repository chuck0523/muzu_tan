const mongoose = require('../lib/mongoose')
const Schema = mongoose.Schema
const { startOfYesterday } = require('date-fns')

// schema
const FollowLogSchema = new Schema({
  // direction { 0: 'to', 1: 'from' }
  direction:      { type: Number, min: 0, max: 1, required: true },
  // follow_type { 0: 'search follow', 1: 'follow back', 2: 'unfollow' }
  follow_type:    { type: Number, min: 0, max: 2 },
  account:        { type: String, required: true },
  search_result:  { type: String },
  created_at:     { type: Date, default: Date.now, index: true },
})

const FollowLog = mongoose.model('FollowLog', FollowLogSchema)

const logError = (err) => console.error('Failed when logging:', err)

// add custom methods
FollowLog.getYesterdayLogs = () => {
  return FollowLog.find({ created_at: { $gte: startOfYesterday() }}).catch(logError)
}

FollowLog.saveSearchFollow = ({ account, search_result }) => {
  new FollowLog({ direction: 0, follow_type: 0, account, search_result }).save().catch(logError)
}
FollowLog.saveFollowBack = ({ account }) => {
  new FollowLog({ direction: 0, follow_type: 1, account }).save().catch(logError)
}
FollowLog.saveUnfollow = ({ account }) => {
  new FollowLog({ direction: 0, follow_type: 2, account }).save().catch(logError)
}
FollowLog.saveFollowed = ({ account }) => {
  new FollowLog({ direction: 1, account }).save().catch(logError)
}

module.exports = FollowLog
