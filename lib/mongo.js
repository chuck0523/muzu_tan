const mongoose = require('mongoose')

module.exports.connect = ({ mongo_account_name, mongo_user_name, mongo_password }) => {
  mongoose.connect(`mongodb://${mongo_user_name}:${mongo_password}@ds161960.mlab.com:61960/${mongo_account_name}`)
}
