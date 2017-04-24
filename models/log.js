const mongoose = require('../lib/mongoose')
const Schema = mongoose.Schema;
const { startOfYesterday } = require('date-fns')

// schema
const LogSchema = new Schema({
  _id:        { type: Number, required: true },
  type:       { type: Number, min: 0, max: 4, required: true },
  log:        { type: String, required: true },
  createdAt:  { type: Date, default: Date.now, index: true },
})
// log typs { 1: 'tweet', 2: 'reply', 3: 'follow', 4: 'error', 0: others}

const Log = mongoose.model('Log', LogSchema)

// add custom methods
Log.getYesterdayLogs = () => {
  return Log.find({ createdAt: { $gte: startOfYesterday() } })
    .catch(err => console.error('Failed to get logs from yesterday :', err))
}

module.exports = Log
