module.exports = (client) => {
  return (userId) => client.post('friendships/create', { user_id: userId })
}
