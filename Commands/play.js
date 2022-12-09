const { SlashCommandBuilder } = require('discord.js');

const { QueryType } = require("discord-player");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addSubcommand((subcommand) => {
      return subcommand
        .setName("search")
        .setDescription("Searches for a song of your choosing")
        .addStringOption((option) => {
          return option
            .setName("query")
            .setDescription("Search any keywords")
            .setRequired(true);
        });
    })
    .addSubcommand((subcommand) => {
      return subcommand
        .setName("playlist")
        .setDescription("Play a youtube playlist")
        .addStringOption((option) => {
          return option
            .setName("url")
            .setDescription("Playlist URL")
            .setRequired(true);
        });
    })
    .addSubcommand((subcommand) => {
      return subcommand
        .setName("song")
        .setDescription("Plays a song from youtube")
        .addStringOption((option) => {
          return option
            .setName("url")
            .setDescription("URL of the song")
            .setRequired(true)
    });
    }),

    async run({client, interaction}) {
        if(!interaction.member.voice.channel) {
            await interaction.reply("You must be in a voice channel to use this command.")
        }

        const queue = await client.player.createQueue(interaction.guild)
        if(!queue.connection) await queue.connect(interaction.member.voice.channel)

        const embed = new Discord.EmbedBuilder();
        if(interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url");

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            });

            if(result.tracks.length === 0){
                await interaction.reply("No results were found for your URL");
                return
            }

            const song = result.tracks[0]
            await queue.addTrack(song);

            embed.setDescription(`Added **[${song.title}](${song.url})** to the queue`)
                 .setThumbnail(song.thumbnail)
                 .setFooter({text: `Duration ${song.duration}`})
                 .setAuthor({name: interaction.user.tag})
                 .setColor("AQUA")
        }
        else if(interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url");

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,
            });

            if(result.tracks.length === 0){
                await interaction.reply("No playlist was found");
                return
            }

            const playlist = result.tracks[0]
            await queue.addTracks(playlist);

            embed.setDescription(`Added **[${playlist.title}](${playlist.url})** to the queue`)
                 .setThumbnail(playlist.thumbnail)
                 .setFooter({text: `Duration ${playlist.duration}`})
                 .setAuthor({name: interaction.user.tag})
                 .setColor("AQUA")
        }
        else if(interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("query");

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });

            if(result.tracks.length === 0){
                await interaction.reply("No results were found for your query");
                return
            }

            const song = result.tracks[0]
            await queue.addTrack(song);

            embed.setDescription(`Added **[${song.title}](${song.url})** to the queue`)
                 .setThumbnail(song.thumbnail)
                 .setFooter({text: `Duration ${song.duration}`})
                 .setAuthor({name: interaction.user.tag })
                 .setColor("AQUA")
        }
        

        if(queue.connection) await queue.play();

        await interaction.reply({
            embeds: [embed]
        })
    }
};
