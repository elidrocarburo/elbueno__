const { addKeyword} = require('@bot-whatsapp/bot')

module.exports = addKeyword(['tarjeta']).addAnswer("Mi tarjeta de presentación", null, async (ctx, { provider }) => {
    // send a contact!
    const vcard =
        "BEGIN:VCARD\n" + // metadata of the contact card
        "VERSION:3.0\n" +
        "FN:HecBot\n" + // full name
        "AAAIMX;\n" + // the organization of the contact
        "TEL;type=CELL;type=VOICE;waid=9995521599:9995521599\n" + // WhatsApp ID + phone number
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