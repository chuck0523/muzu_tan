const smtpConfig = {
  host: 'smtp.gmail.com',
  secure: true, // use SSL
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
}
const transport = require('nodemailer').createTransport(smtpConfig)

module.exports.sendMail = ({ subject, text }) => {
  return transport.sendMail({
    from: process.env.GMAIL_ADDRESS,
    to: process.env.GMAIL_ADDRESS,
    subject,
    text,
  })
    .catch(err => console.error('Fail to send mail: ', err))
}
