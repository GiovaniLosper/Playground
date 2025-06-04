import { SlashCommandBuilder } from 'discord.js';
import { triggerWebhook } from '../../../integrations/n8n.js';

export const data = new SlashCommandBuilder()
  .setName('voice')
  .setDescription('Generate voice via n8n')
  .addStringOption(o => o.setName('topic').setDescription('Topic for voice generation').setRequired(true));

export async function execute(interaction) {
  const topic = interaction.options.getString('topic');
  await interaction.deferReply({ ephemeral: true });
  const ok = await triggerWebhook('voice', { topic });
  await interaction.editReply(ok ? 'Voice generation triggered, Sir.' : 'Webhook failed, Sir.');
}
