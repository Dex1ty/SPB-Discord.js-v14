// Requiring discord.js classes
const { Client, Events, GatewayIntentBits, ActivityType, Collection } = require("discord.js");
const { REST } = require("@discordjs/rest")
const { Routes } = require('discord-api-types/v9')
const { readdirSync, read } = require("fs");

//  Getting the token from the config
const token = process.env["token"];

// Creating the client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});


// Getting the IDs for both client & guild for slashcommands
const clientId = process.env['clientID'];
const guildId = process.env['guildID'] //TEMP FOR TESTING PURPOSES

//Slash Commands handler
const path = require("path");
const slashCommands = []
client.slashCommands = new Collection();

const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const slashComm = require(filePath);
if("data" in slashComm && "run" in slashComm) {
client.slashCommands.set(slashComm.data.name, slashComm);
slashCommands.push(slashComm.data.toJSON());
} else {
  console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`);
}
}


//EVENTS HANDLER
const eventsPath = path.join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args));
	} else {
		client.on(event.name, (...args) => event.run(...args));
	}
}










client.login(token)


