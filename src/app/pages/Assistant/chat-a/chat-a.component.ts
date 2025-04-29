import { Component, OnInit } from '@angular/core';
import { Assistant } from 'src/app/Models/assistant';
import { Message } from 'src/app/Models/message';
import { User } from 'src/app/Models/user';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';
import { MessageService } from 'src/app/service/chat/message.service';

@Component({
  selector: 'app-chat-a',
  templateUrl: './chat-a.component.html',
  styleUrls: ['./chat-a.component.css']
})
export class ChatAComponent implements OnInit {
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

  error: string;
  avocats: any[];
  assistant: Assistant;

  constructor(private messageService: MessageService,private avocatService :AvocatService, private assistantService: AssistantService) {}
  
    ngOnInit() {
      this.AsisstantID  = Number(localStorage.getItem('id'));
      this.messageService.getPartners(this.AsisstantID).subscribe(users => this.users = users);
      this.getAssistant(this.AsisstantID); 

    }
  
    selectUser(user: User) {
      this.selectedUser = user;
      this.loadMessages();
    }
  
    loadMessages() {
      if (!this.selectedUser) return;
  
      this.messageService.getConversation(this.AsisstantID, this.selectedUser.id)
  
        .subscribe(msgs => this.messages = msgs);
  
    }

    getAssistant(AssistantId: number): void {
      this.isLoading = true;
      this.assistantService.getAssistantById(AssistantId).subscribe({
        next: (data) => {
          this.assistant = data;
          console.warn('Assistant reçu:', this.assistant);
    
          // Vérifie si l'objet assistant et cabinet existent dans la réponse
          if (this.assistant && this.assistant.cabinet) {
            this.cabinetId = this.assistant.cabinet.id;
            console.log('ID du cabinet:', this.cabinetId);
            this.loadAvocatsByCabinet(this.cabinetId); 
          } else {
            console.warn('Aucun cabinet associé à cet assistant');
          }
    
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Échec du chargement des détails de l\'assistant';
          this.isLoading = false;
          console.error('Erreur:', err);
        }
      });
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
        senderId: this.AsisstantID,
        receiverId: this.selectedUser!.id,
        content: this.newMessage
      };
      this.messageService.sendMessage(message).subscribe(sent => {
        this.messages.push(sent);
        this.newMessage = '';
      });
    }

    
    loadAvocatsByCabinet(cabinetId : number): void {
      console.log('CabinetID:', cabinetId); // Vérifie si cabinetId est valide
      
     
      this.avocatService.getAvocatsByCabinetId(this.cabinetId).subscribe({
        next: (avocats) => {
          console.log('Avocats chargés:', avocats);
          if (avocats && avocats.length > 0) {
            this.avocats = avocats; // ← utiliser `users`, pas `assistants`
          } else {
            console.log('Aucun avocat trouvé pour ce cabinet.');
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement des avocats:', err);
        }
      });
      
    }
    
  }