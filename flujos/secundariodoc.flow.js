const { addKeyword} = require('@bot-whatsapp/bot')
const secunsecundocFlow = require('./secunsecundoc.flow')

module.exports = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario y mira cómo escribes *doc* y así siguies a un flujo secundario'], null, null, [secunsecundocFlow])
