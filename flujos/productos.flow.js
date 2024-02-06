const { addKeyword} = require('@bot-whatsapp/bot')
const axios = require('axios').default;
const cancelarFlow = require('./cancelar.flow')
const APIPRODUCTOS = 'https://fakestoreapi.com/products'


module.exports = addKeyword(['productos'])
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
    [cancelarFlow]
)