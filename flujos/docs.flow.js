const { addKeyword} = require('@bot-whatsapp/bot')
const secundariodocFlow = require('./secundariodoc.flow')

module.exports = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [secundariodocFlow]
)
