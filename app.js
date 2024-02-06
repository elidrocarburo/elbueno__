const axios = require('axios').default;
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const ChatGPTClass = require('./chatgpt.class');
const {PROMP} = require('./promp')
const notavozFlow = require('./flujos/notavoz.flow')
const imagenFlow = require('./flujos/imagen.flow')
const docsFlow = require('./flujos/docs.flow')
const tutoFlow = require('./flujos/tuto.flow')
const graciasFlow = require('./flujos/gracias.flow')
const discordFlow = require('./flujos/discord.flow')
const cancelarFlow = require('./flujos/cancelar.flow')

const ChatGPTInstance = new ChatGPTClass()


const soyese = 'https://i.pinimg.com/236x/2e/3d/97/2e3d97cc1ad6010f10fd8511d7cf470b.jpg'
const APIPRODUCTOS = 'https://fakestoreapi.com/products'

const flowCancelar = addKeyword(['cancelar']).addAnswer('👋 Hasta luego', async (ctx, { endflow }) => { return endflow })



const flowTarjeta = addKeyword(['tarjeta']).addAnswer("Mi tarjeta de presentación", null, async (ctx, { provider }) => {
    // send a contact!
    const vcard =
        "BEGIN:VCARD\n" + // metadata of the contact card
        "VERSION:3.0\n" +
        "FN:HecBot\n" + // full name
        "AAAIMX;\n" + // the organization of the contact
        "TEL;type=CELL;type=VOICE;waid=+529995521599:9995521599\n" + // WhatsApp ID + phone number
        "END:VCARD";

    const id = ctx.key.remoteJid
    const sock = await provider.getInstance()
    const sentMsg = await sock.sendMessage(id, {
        contacts: {
            displayName: "HecBot",
            contacts: [{ vcard }],
        },
    });
})

const flowProductos = addKeyword(['productos'])
    .addAnswer('Consultando al stock de productos...', null,
        async (ctx, { flowDynamic, }) => {
            const respuesta = await axios.get(APIPRODUCTOS)
            let contador = 1
            console.log(respuesta.data)
            for (const item of respuesta.data) {
                if (contador > 4) break;
                contador++

                await flowDynamic([{ body: item.title, media: item.image }])

            }
        },
        [flowCancelar]
    )

const flowConfirmar = addKeyword(['si confirmo']).addAnswer('👍 Confirmado continuamos')

const flowChatGPT = addKeyword(['chatgpt']).addAnswer('🤖 Pruebame nene', null, async () => {
    await ChatGPTInstance.handleMsgChatGPT(PROMP)
    }).addAnswer('🤖 Pruebame nene', {capture:true}, 
    async (ctx,{flowDynamic,fallBack}) => {
        const response = await ChatGPTInstance.handleMsgChatGPT(ctx.body)
        const message = response.text
        if(ctx.body !== 'si confirmo'){
            return fallBack(message)
        }
    },[flowConfirmar,flowCancelar])

const flowPrincipal = addKeyword([EVENTS.WELCOME, 'hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer('Soy ese:'
        ,
        { // FUNCIÓN NO DISPONIBLE
            media: soyese
/*     delay:1000,
//     capture:true,
//     buttons:[
//         {text:'👉 *doc* para ver la documentación'},
//         {text:'👉 *gracias*  para ver la lista de videos'},
//         {text:'👉 *discord* unirte al discord'}
]*/
        }

    )
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
            '👉 *productos* checa los productos bro',
            '👉 *tarjeta* para ver un ejemplo rapido',
            '👉 *chatgpt* pruebame nene',
            '👉 *cancelar* para salir'
        ],
        { capture: true },
        async (ctx, { fallBack }) => {
            if (!['doc', 'gracias', 'discord', 'productos'].includes(ctx.body)) {
                return fallBack('No entiendo que quieres decir')
            }
        },
        [docsFlow, graciasFlow, tutoFlow, discordFlow, flowProductos, cancelarFlow, flowTarjeta,flowChatGPT]
    )

/* FUNCIÓN NECEARIA SI SOLO SE REQUIERE CHATGPT SOLITO DA CLIC DE NECESITARLA
// const createBotChatGPT = async ({ database,provider }) => {
//     return new ChatGPTClass(database,provider)
*/

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, notavozFlow, imagenFlow])
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
