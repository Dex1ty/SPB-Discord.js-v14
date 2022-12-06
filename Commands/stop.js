const { SlashCommandBuilder } = require('discord.js');

const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops the music and leaves the voice channel."),
        async run({client, interaction}) {
            const queue = client.player.getQueue(interaction.guild)

            if(!queue){
                await interaction.reply("There is no song playing yet.")
                return;
            }

            
            queue.destroy();

            await interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle("Bye for now!")
                        .setImage("https://tenor.com/bXgEm.gif")
                ]
            })
        }
}

