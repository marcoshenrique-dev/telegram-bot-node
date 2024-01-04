import dotenv from 'dotenv';

dotenv.config();

import TelegramBot from 'node-telegram-bot-api';
import express from 'express';

import {format} from 'date-fns';

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

const app = express();
const port = process.env.PORT;

app.post('/webhook', async (req, res) => {
  const chatId = process.env.CHAT_ID;
  const messageText = `Alerta! 💣 Movimento detectado - ${format(new Date(), 'dd/MM/yyyy \'às\' HH:mm')}`;

  try {
    await bot.sendMessage(chatId, messageText);
    console.log('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.message);
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
