import { SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const data = new SlashCommandBuilder()
  .setName('status')
  .setDescription('Check system readiness');

export async function execute(interaction) {
  await interaction.deferReply({ ephemeral: true });
  try {
    await axios.get(process.env.N8N_WEBHOOK_URL);
    await interaction.editReply('All systems nominal, Sir.');
  } catch {
    await interaction.editReply('n8n webhook unreachable, Sir.');
  }
}
