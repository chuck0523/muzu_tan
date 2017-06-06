// Currently API is broken
// https://github.com/matheuss/google-translate-api/pull/18

const translate = require('google-translate-api')

translate.toEn = (text) => {
  return translate(text, { from: 'ja', to: 'en' })
    .catch(err => console.error('Failed to translate: ', err))
}

module.exports = translate
