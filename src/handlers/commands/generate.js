import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { chatCompletion } from '../../openai.js';

export const data = new SlashCommandBuilder()
  .setName('generate')
  .setDescription('Generate a short AI story about a topic')
  .addStringOption(o => o.setName('topic').setDescription('Story topic').setRequired(true));

export async function execute(interaction) {
  const topic = interaction.options.getString('topic');
  await interaction.deferReply();
  try {
    const content = await chatCompletion([
      { role: 'system', content: 'You are Friday, the witty AI assistant.' },
      { role: 'user', content: `Write a short story about ${topic}` }
    ]);
    const embed = new EmbedBuilder()
      .setTitle('Story Time, Sir')
      .setDescription(content);
    await interaction.editReply({ embeds: [embed] });
  } catch {
    await interaction.editReply('Story generation failed, Sir.');
  }
}
