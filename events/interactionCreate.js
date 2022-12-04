const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async run(client, interaction) {
  if (!interaction.isCommand()) {
    return
  }
  const slashComms = client.slashCommands.get(interaction.commandName);
  if (!slashComms) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await slashComms.run({client, interaction});
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
    }
}