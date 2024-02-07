const { addKeyword, EVENTS} = require('@bot-whatsapp/bot')
const docsFlow = require('./flujos/docs.flow')
const tutoFlow = require('./flujos/tuto.flow')
const graciasFlow = require('./flujos/gracias.flow')
const discordFlow = require('./flujos/discord.flow')
const cancelarFlow = require('./flujos/cancelar.flow')
const tarjetaFlow = require('./flujos/tarjeta.flow')
const chatgptFlow = require('./flujos/chatgpt.flow')
const productosFlow = require('./flujos/productos.flow')

const soyese = 'https://i.pinimg.com/236x/2e/3d/97/2e3d97cc1ad6010f10fd8511d7cf470b.jpg'

module.exports= addKeyword([EVENTS.WELCOME, 'hola', 'ole', 'alo'])
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
        [docsFlow, graciasFlow, tutoFlow, discordFlow, productosFlow, cancelarFlow, tarjetaFlow,chatgptFlow]
    )
