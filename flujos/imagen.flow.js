const { addKeyword, EVENTS} = require('@bot-whatsapp/bot')

module.exports = addKeyword(EVENTS.MEDIA).addAnswer(['En un momento veo tu imágen'])
