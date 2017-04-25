const mongoose = require('../lib/mongoose')
const Schema = mongoose.Schema;
const { startOfYesterday } = require('date-fns')

// schema
const ReplyLogSchema = new Schema({
  // reply_type { 0: 'empty reply', 1: 'answer reply', 2: 'translate reply'. 3: 'other reply' }
  reply_type: { type: Number, min: 0, max: 3, required: true },
  account:    { type: String, required: true },
  created_at: { type: Date, default: Date.now, index: true },
})

const ReplyLog = mongoose.model('ReplyLog', ReplyLogSchema)

const logError = (err) => console.error('Failed when logging:', err)

// add custom methods
ReplyLog.getYesterdayLogs = () => {
  return ReplyLog.find({ created_at: { $gte: startOfYesterday() }}).catch(logError)
}

ReplyLog.saveEmptyReply = (account) => {
  new ReplyLog({ reply_type: 0, account }).save().catch(logError)
}
ReplyLog.saveAnswerReply = (account) => {
  new ReplyLog({ reply_type: 1, account }).save().catch(logError)
}
ReplyLog.saveTranslateReply = (account) => {
  new ReplyLog({ reply_type: 2, account }).save().catch(logError)
}
ReplyLog.saveOtherReply = (account) => {
  new ReplyLog({ reply_type: 3, account }).save().catch(logError)
}

module.exports = ReplyLog
