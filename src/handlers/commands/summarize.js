import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { chatCompletion } from '../../openai.js';

export const data = new SlashCommandBuilder()
  .setName('summarize')
  .setDescription('Summarize text using GPT-4o')
  .addStringOption(o => o.setName('text').setDescription('Text to summarize').setRequired(true));

export async function execute(interaction) {
  const text = interaction.options.getString('text');
  await interaction.deferReply();
  try {
    const content = await chatCompletion([
      { role: 'system', content: 'You are Friday, the witty AI assistant.' },
      { role: 'user', content: `Summarize the following:
${text}` }
    ]);
    const embed = new EmbedBuilder()
      .setTitle('Summary, Sir')
      .setDescription(content);
    await interaction.editReply({ embeds: [embed] });
  } catch {
    await interaction.editReply('Summarization failed, Sir.');
  }
}
