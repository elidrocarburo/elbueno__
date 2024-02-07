const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const notavozFlow = require('./flujos/notavoz.flow')
const imagenFlow = require('./flujos/imagen.flow')
const welcomeFlow = require('./flujos/welcome.flow')

/* FUNCIÓN NECEARIA SI SOLO SE REQUIERE CHATGPT SOLITO DA CLIC DE NECESITARLA
// const createBotChatGPT = async ({ database,provider }) => {
//     return new ChatGPTClass(database,provider)
*/

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([welcomeFlow, notavozFlow, imagenFlow])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    }
    )

    QRPortalWeb()
}

main()
