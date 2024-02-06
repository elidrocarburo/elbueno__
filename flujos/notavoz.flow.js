const {addKeyword, EVENTS} = require('@bot-whatsapp/bot')

module.exports = addKeyword(EVENTS.VOICE_NOTE).addAnswer(['Te escucho en un momento te respondo'])
