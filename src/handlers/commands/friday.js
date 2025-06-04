import { SlashCommandBuilder } from 'discord.js';
import { chatStream } from '../../openai.js';

export const data = new SlashCommandBuilder()
  .setName('friday')
  .setDescription('Consult the Friday AI assistant')
  .addStringOption(o => o.setName('prompt').setDescription('Your question').setRequired(true));

export async function execute(interaction) {
  const prompt = interaction.options.getString('prompt');
  await interaction.deferReply();
  let reply = '';
  try {
    await chatStream([
      { role: 'system', content: 'You are Friday, a sarcastic but loyal AI assistant. Always address the server admin as "Sir".' },
      { role: 'user', content: prompt }
    ], token => {
      reply += token;
      interaction.editReply(reply);
    });
  } catch {
    await interaction.editReply('Sorry Sir, something went wrong.');
  }
}
