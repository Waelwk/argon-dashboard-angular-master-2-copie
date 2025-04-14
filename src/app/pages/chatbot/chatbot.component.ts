import { Component } from '@angular/core';
import { ChatbotService, ChatRequest, ChatResponse } from 'src/app/service/chatboot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})export class ChatbotComponent {
  question = '';
  loading = false;

  messages: { text: string; type: 'user-message' | 'bot-message' }[] = [];

  constructor(private chatbotService: ChatbotService) {  this.messages.push({
    text: 'Bonjour ! Je suis votre assistant juridique. Posez-moi une question juridiques .',
    type: 'bot-message'
  });}

  sendQuestion() {
    if (!this.question.trim()) return;

    const currentQuestion = this.question;
    this.messages.push({ text: currentQuestion, type: 'user-message' });
    this.loading = true;
    this.question = '';

    this.chatbotService.askQuestion({ question: currentQuestion }).subscribe({
      next: (res) => {
        this.messages.push({ text: res.answer, type: 'bot-message' });
        this.loading = false;
      },
      error: () => {
        this.messages.push({ text: 'Erreur de connexion. Réessayez.', type: 'bot-message' });
        this.loading = false;
      }
    });
  }
}
