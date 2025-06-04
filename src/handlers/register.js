import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export default async function registerCommands(client) {
  const commands = [];
  const commandFiles = fs.readdirSync('./src/handlers/commands').filter(f => f.endsWith('.js'));
  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Slash commands registered.');
  } catch (err) {
    console.error('Error registering commands:', err);
  }
}
