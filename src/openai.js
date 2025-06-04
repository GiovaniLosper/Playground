import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
  }
});

export async function chatStream(messages, onToken) {
  try {
    const res = await api.post('/chat/completions', {
      model: 'gpt-4o',
      messages,
      stream: true
    }, { responseType: 'stream' });

    res.data.on('data', chunk => {
      const lines = chunk.toString().split('\n').filter(line => line.trim());
      for (const line of lines) {
        if (line === 'data: [DONE]') return;
        const msg = JSON.parse(line.replace(/^data: /, ''));
        const token = msg.choices[0].delta.content;
        if (token) onToken(token);
      }
    });

    return new Promise(resolve => res.data.on('end', resolve));
  } catch (err) {
    console.error('OpenAI error:', err.response?.data || err.message);
    throw err;
  }
}

export async function chatCompletion(messages) {
  const res = await api.post('/chat/completions', {
    model: 'gpt-4o',
    messages
  });
  return res.data.choices[0].message.content;
}
