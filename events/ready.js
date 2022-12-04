const { Events, ActivityType } = require("discord.js");
const { REST } = require("@discordjs/rest");

module.exports = {
    name: Events.ClientReady,
    once: false,
    run(client){
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