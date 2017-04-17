const mongoose = require('mongoose')

module.exports.connect = ({ mongo_user_name, mongo_password }) => {
  console.log(`mongodb://${mongo_user_name}:${mongo_password}@ds127978.mlab.com:27978/heroku_mx9q74hs`)
  mongoose.connect(`mongodb://${mongo_user_name}:${mongo_password}@ds127978.mlab.com:27978/heroku_mx9q74hs`)
}
