import { Client, IntentsBitField, Collection } from 'discord.js';
import dotenv from 'dotenv';
import registerCommands from './handlers/register.js';
import fs from 'fs';

dotenv.config();

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds]
});

client.commands = new Collection();

// Load command modules
const commandFiles = fs.readdirSync('./src/handlers/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = await import(`./handlers/commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await registerCommands(client);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    interaction.reply({ content: 'Error executing command.', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
