const { SlashCommandBuilder } = require('discord.js');

const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song."),
        async run({client, interaction}) {
            const queue = client.player.getQueue(interaction.guild)

            if(!queue){
                await interaction.reply("There is no song playing yet.")
                return;
            }
            const currentSong = queue.current;
            
            queue.skip();

            await interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`Skipped **${currentSong.title}**`)
                        .setThumbnail(currentSong.thumbnail)
                        .setColor("AQUA")
                ]
            })
        }
}

