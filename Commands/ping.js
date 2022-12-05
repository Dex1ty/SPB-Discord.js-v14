const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with your discord clients ping."),
        async run({client, interaction}) {
            const messagee = await interaction.reply(`Ping: ${client.ws.ping}`)

        }    
}