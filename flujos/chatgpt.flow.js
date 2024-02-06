const {addKeyword} = require('@bot-whatsapp/bot');
const {PROMP} = require('../promp');
const ChatGPTClass = require('../chatgpt.class');
const confirmarFlow = require('./confirmar.flow');
const cancelarFlow = require('./cancelar.flow');
const ChatGPTInstance = new ChatGPTClass()


module.exports = addKeyword(['chatgpt']).addAnswer('🤖 Pruebame nene', null, async () => {
    await ChatGPTInstance.handleMsgChatGPT(PROMP)
    }).addAnswer('🤖 Pruebame nene', {capture:true}, 
    async (ctx,{flowDynamic,fallBack}) => {
        const response = await ChatGPTInstance.handleMsgChatGPT(ctx.body)
        const message = response.text
        if(ctx.body !== 'si confirmo'){
            return fallBack(message)
        }
    },[confirmarFlow, cancelarFlow])

// module.exports = async ({ database,provider }) => {
//         return new ChatGPTClass(database,provider)
//     }