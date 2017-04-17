const mongoose = require('mongoose')

// http://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
mongoose.Promise = global.Promise

module.exports.connect = ({ mongo_account_name, mongo_user_name, mongo_password }) => {
  mongoose.connect(`mongodb://${mongo_user_name}:${mongo_password}@ds161960.mlab.com:61960/${mongo_account_name}`)
  return mongoose
}
