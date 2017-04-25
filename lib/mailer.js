const smtpConfig = {
  host: 'smtp.gmail.com',
  secure: true, // use SSL
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
}
const transport = require('nodemailer').createTransport(smtpConfig)

const mailerError = (err) => console.error('Failed to send mail: ', err)

module.exports.sendTextMail = ({ subject, text }) => {
  return transport.sendMail({
    from: process.env.GMAIL_ADDRESS,
    to: process.env.GMAIL_ADDRESS,
    subject,
    text,
  }).catch(mailerError)
}

module.exports.sendHtmlMail = ({ subject, html }) => {
  return transport.sendMail({
    from: process.env.GMAIL_ADDRESS,
    to: process.env.GMAIL_ADDRESS,
    subject,
    html,
  }).catch(mailerError)
}
