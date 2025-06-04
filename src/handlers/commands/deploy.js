import { SlashCommandBuilder } from 'discord.js';
import { triggerWebhook } from '../../../integrations/n8n.js';

export const data = new SlashCommandBuilder()
  .setName('deploy')
  .setDescription('Upload latest video to TikTok and YouTube Shorts');

export async function execute(interaction) {
  await interaction.deferReply({ ephemeral: true });
  const ok = await triggerWebhook('deploy');
  await interaction.editReply(ok ? 'Deployment initiated, Sir.' : 'Deployment failed, Sir.');
}
