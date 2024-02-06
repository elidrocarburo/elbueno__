const {addKeyword} = require('@bot-whatsapp/bot');

module.exports = addKeyword(['cancelar']).addAnswer('👋 Hasta luego', async (ctx, { endflow }) => { return endflow })
