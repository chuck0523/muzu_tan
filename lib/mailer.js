const {
  GMAIL_ADDRESS, GMAIL_PASSWORD
} = process.env

const smtpConfig = {
  host: 'smtp.gmail.com',
  secure: true, // use SSL
  auth: {
    user: GMAIL_ADDRESS,
    pass: GMAIL_PASSWORD,
  },
}
const transport = require('nodemailer').createTransport(smtpConfig)

const mailerError = (err) => console.error('Failed to send mail: ', err)

module.exports.sendTextMail = ({ subject, text }) => {
  return transport.sendMail({
    from: GMAIL_ADDRESS,
    to: GMAIL_ADDRESS,
    subject,
    text,
  }).catch(mailerError)
}

module.exports.sendHtmlMail = ({ subject, html }) => {
  return transport.sendMail({
    from: GMAIL_ADDRESS,
    to: GMAIL_ADDRESS,
    subject,
    html,
  }).catch(mailerError)
}
