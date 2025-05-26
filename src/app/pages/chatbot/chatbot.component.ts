import { Component } from '@angular/core';
import { ChatbotService, ChatRequest, ChatResponse } from 'src/app/service/chatboot/chatbot.service';

interface ChatMessage {
  text: string;
  type: 'user-message' | 'bot-message' | 'explanation-message';
  response?: string;   // réponse associée à l'explication (si applicable)
  showResponse?: boolean; // contrôle affichage réponse
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

  constructor(private chatbotService: ChatbotService) {
    this.messages.push({
      text: 'Bonjour ! Je suis votre assistant juridique. Posez-moi une question juridique.',
      type: 'bot-message'
    });
  }

  sendQuestion() {
    if (!this.message.trim()) return;

    const currentQuestion = this.message.trim();
    this.messages.push({ text: currentQuestion, type: 'user-message' });

    this.loading = true;
    this.message = '';

    const request: ChatRequest = { message: currentQuestion };

    this.chatbotService.askQuestion(request).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.explanation && res.explanation.trim() !== '') {
          // Ajouter un message d'explication avec réponse cachée
          this.messages.push({
            text: res.explanation.trim(),
            type: 'explanation-message',
            response: res.response.trim(),
            showResponse: false
          });
        } else {
          // Ajouter directement la réponse simple
          this.messages.push({ text: res.response.trim(), type: 'bot-message' });
        }
      },
      error: () => {
        this.loading = false;
        this.messages.push({ text: 'Erreur de connexion. Réessayez.', type: 'bot-message' });
      }
    });
  }

  toggleResponse(msg: ChatMessage) {
    msg.showResponse = !msg.showResponse;
  }
}
