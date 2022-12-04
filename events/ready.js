const { Events } = require("discord.js");
const { REST } = require("@discordjs/rest");

module.exports = {
    name: Events.ClientReady,
    once: false,
    run(client){
            const rest = new REST({ version: '10' }).setToken(token);
        
            (async () => {
              try {
                console.log(`Started refreshing ${slashCommands.length} application (/) commands.`);
            
                // The put method is used to fully refresh all commands in the guild with the current set
                const data = await rest.put(
                  Routes.applicationGuildCommands(clientId, guildId),
                  { body: slashCommands },
                );
            
                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
              } catch (error) {
                // And of course, make sure you catch and log any errors!
                console.error(error);
              }
            })();



             //PRESENCE - MORE NEEDS TO BE ADDED
            const status = [
            `My prefix is !`,
            `Vibing with Dex1ty!`,
            `Vibing with Bob`,
            `Gotta Mic?`
            ];
          
            let index = 0;
            setInterval(() => {
              if(index === status.length) index = 0;
              const statusQ = status[index];
              client.user.setPresence({ activities: [{ name: `/help | ${statusQ}`, type: ActivityType.Playing }], status: "dnd" }); 
              index++;
            }, 20000)
            console.log("Senpai Bot is now Online.");

            console.log(client.guilds.cache.size);
    }
}