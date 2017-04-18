// Currently API is broken
// https://github.com/matheuss/google-translate-api/pull/18

const translate = require('google-translate-api')

translate.toEn = (text) => {
  return translate(text, { from: 'ja', to: 'en' })
    .catch(err => `Failed to translate`)
}

module.exports = translate
