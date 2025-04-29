import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/Models/message';
import { MessageService } from 'src/app/service/chat/message.service';
import { User } from 'src/app/Models/user';
import { AvocatService } from 'src/app/service/Avocat/avocat.service'; // au cas où tu en as encore besoin
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
import { ManagerService } from 'src/app/service/user/manager.service';
import { Assistant } from 'src/app/Models/assistant';

@Component({
  selector: 'app-chat-m',
  templateUrl: './chat-m.component.html',
  styleUrls: ['./chat-m.component.css']
})
export class ChatMComponent implements OnInit {
assistants: User[] = []; // Add this property to store assistants

  users: User[] = [];
  selectedUser?: User;
  messages: Message[] = [];
  newMessage = '';
  currentUserId : number; // id connecté

  AsisstantID: number; // Utilisez uniquement cet ID pour la comparaison
  currentUserAvatar?: string; // Ajoutez cette propriété si nécessaire
  cabinetId: number;
  isLoading: boolean;
  assistant:Assistant;
  error: string;
  avocats: any[];

  constructor(private managerService : ManagerService  ,private messageService: MessageService,private avocatService :AvocatService, private assistantService: AssistantService) {}
  
  ngOnInit() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.currentUserId = Number(userId);
    } else {
      console.error('Aucun ID utilisateur trouvé dans le localStorage');
      this.currentUserId = -1; // ou une autre valeur par défaut invalide
    }
  
    // Charger l'admin
    this.managerService.getUserByIdd(602).subscribe(admin => {
      this.selectedUser = admin;
      this.users = [admin];
      this.loadMessages();
    });
  }
  
  
    selectUser(user: User) {
      this.selectedUser = user;
      this.loadMessages();
    }
  
    loadMessages() {
      if (!this.selectedUser) return;
  
      this.messageService.getConversation( this.currentUserId , this.selectedUser.id)
  
        .subscribe(msgs => this.messages = msgs);
  
    }

    selectUserById(event: Event) {
      const selectedId = Number((event.target as HTMLSelectElement).value);
      const avocat = this.avocats.find(a => a.id === selectedId);
      if (avocat) {
        this.selectUser(avocat);
      }
    }



    send() {
      if (!this.newMessage.trim()) return;
    
      const message: Message = {
        senderId: this.currentUserId,
        receiverId: 1, // toujours vers l’admin
        content: this.newMessage
      };
    
      this.messageService.sendMessage(message).subscribe(sent => {
        this.messages.push(sent);
        this.newMessage = '';
      });
    }
    
    
    
    
  }