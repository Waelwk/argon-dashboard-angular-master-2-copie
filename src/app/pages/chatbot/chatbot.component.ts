// chatbot.component.ts
import { Component } from '@angular/core';
import {
  ChatbotService,
  ChatRequest as ChatbotRequest,
  ChatResponse as ChatbotResponse
} from 'src/app/service/chatboot/chatbot.service';
import { Chatbotllm } from 'src/app/service/chatboot/chatbotllm.service';

import {
 Chatbotllm as ChatbotllmService,
  ChatRequest as NewChatRequest,
  ChatResponse as NewChatResponse
} from 'src/app/service/chatboot/chatbotllm.service';

interface ChatMessage {
  text: string;
  type: 'user-message' | 'bot-message';
  sender: 'user' | 'assistant-juridique' | 'chatbot-general';
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  message = '';
  loading = false;
  messages: ChatMessage[] = [];

  constructor(
    private chatbotService: ChatbotService,
    private chatService: Chatbotllm 
  ) {
    this.messages.push({
      text: 'Bonjour ! Je suis votre assistant juridique ou chatbot général. Choisissez à qui poser votre question.',
      type: 'bot-message',
      sender: 'assistant-juridique'
    });
  }

  sendToAssistantJuridique() {
    if (!this.message.trim()) return;

    const question = this.message.trim();
    this.messages.push({ text: question, type: 'user-message', sender: 'user' });
    this.message = '';
    this.loading = true;

    const request: ChatbotRequest = { message: question };

    this.chatbotService.askQuestion(request).subscribe({
      next: (res: ChatbotResponse) => {
        this.messages.push({
          text: res.response.trim(),
          type: 'bot-message',
          sender: 'assistant-juridique'
        });
        this.loading = false;
      },
      error: () => {
        this.messages.push({
          text: 'Erreur avec le service assistant juridique.',
          type: 'bot-message',
          sender: 'assistant-juridique'
        });
        this.loading = false;
      }
    });
  }

  sendToChatbotGeneral() {
    if (!this.message.trim()) return;

    const question = this.message.trim();
    this.messages.push({ text: question, type: 'user-message', sender: 'user' });
    this.message = '';
    this.loading = true;

    const request: NewChatRequest = { question };

    this.chatService.sendQuestion(request).subscribe({
      next: (res: NewChatResponse) => {
        this.messages.push({
          text: res.answer.trim(),
          type: 'bot-message',
          sender: 'chatbot-general'
        });
        this.loading = false;
      },
      error: () => {
        this.messages.push({
          text: 'Erreur avec le chatbot général.',
          type: 'bot-message',
          sender: 'chatbot-general'
        });
        this.loading = false;
      }
    });
  }
}
