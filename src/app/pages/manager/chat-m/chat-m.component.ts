import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/Models/message';
import { MessageService } from 'src/app/service/chat/message.service';
import { User } from 'src/app/Models/user';
import { AvocatService } from 'src/app/service/Avocat/avocat.service'; // au cas où tu en as encore besoin

@Component({
  selector: 'app-chat-m',
  templateUrl: './chat-m.component.html',
  styleUrls: ['./chat-m.component.css']
})
export class ChatMComponent implements OnInit {

  messages: Message[] = [];
  newMessage = '';
  ManagerID: number;
  receiverId = 1; // ID fixe de la personne avec qui le manager communique
  receiverUser?: User; // Optionnel, pour afficher son nom/photo
  isLoading = false;
  error: string;

  constructor(
    private messageService: MessageService,
    private avocatService: AvocatService // utile si tu veux afficher les infos de l'utilisateur cible
  ) {}

  ngOnInit() {
    this.ManagerID = Number(localStorage.getItem('id'));
    this.loadMessages();

    // Optionnel : récupérer les infos de l'utilisateur cible (id = 1)

  }

  loadMessages() {
    this.messageService.getConversation(this.ManagerID, this.receiverId)
      .subscribe({
        next: msgs => this.messages = msgs,
        

        error: err => {
          console.error('Erreur lors du chargement des messages :', err);
          this.error = 'Impossible de charger la conversation.';
        }
      
      });
     
  }

  send() {
    if (!this.newMessage.trim()) return;

    const message: Message = {
      senderId: this.ManagerID,
      receiverId: this.receiverId,
      content: this.newMessage
    };

    this.messageService.sendMessage(message).subscribe({
      next: sent => {
        this.messages.push(sent);
        this.newMessage = '';
      },
      error: err => {
        console.error('Erreur envoi message :', err);
        this.error = 'Message non envoyé.';
      }
    });
  }
}
