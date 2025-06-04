import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function triggerWebhook(path, data = {}) {
  const url = `${process.env.N8N_WEBHOOK_URL}/${path}`;
  try {
    await axios.post(url, data);
    return true;
  } catch (err) {
    console.error('n8n webhook error:', err.message);
    return false;
  }
}
