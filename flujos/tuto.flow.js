const { addKeyword} = require('@bot-whatsapp/bot')

module.exports = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
    ],
    null,
    null,
    []
)