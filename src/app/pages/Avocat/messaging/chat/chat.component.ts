import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/Models/message';
import { User } from 'src/app/Models/user';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';
import { MessageService } from 'src/app/service/chat/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  assistants: User[] = []; // Add this property to store assistants

  users: User[] = [];
  selectedUser?: User;
  messages: Message[] = [];
  newMessage = '';
  currentUserId : number; // id connecté

  avocatId: number; // Utilisez uniquement cet ID pour la comparaison
  currentUserAvatar?: string; // Ajoutez cette propriété si nécessaire
  cabinetId: number;

  constructor(private messageService: MessageService,private avocatService :AvocatService, private assistantService: AssistantService) {}

  ngOnInit() {
    this.avocatId = Number(localStorage.getItem('id'));
    this.messageService.getPartners(this.avocatId).subscribe(users => this.users = users);
    this.getCabinetIdByAvocat(this.avocatId);
    this.loadAssistantsByCabinet( this.cabinetId);
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.loadMessages(); 
  }

  loadMessages() {
    if (!this.selectedUser) return;

    this.messageService.getConversation(this.avocatId, this.selectedUser.id)

      .subscribe(msgs => this.messages = msgs);

  }
  selectUserById(event: Event) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    const assistant = this.assistants.find(a => a.id === selectedId);
    if (assistant) {
      this.selectUser(assistant);
    }
  }
  send() {
    if (!this.newMessage.trim()) return;
    const message: Message = {
      senderId: this.avocatId,
      receiverId: this.selectedUser!.id,
      content: this.newMessage
    };
    this.messageService.sendMessage(message).subscribe(sent => {
      this.messages.push(sent);
      this.newMessage = '';
    });
  }
  getCabinetIdByAvocat(avocatId: number): void {
    this.avocatService.getAvocatById(avocatId).subscribe(
      (avocat) => {
        if (avocat.cabinet) {
          this.cabinetId = avocat.cabinet.id;  // Stocke l'ID du cabinet
            
          console.log('ID du cabinet de l\'avocat :', this.cabinetId);
          this.loadAssistantsByCabinet(this.cabinetId);
        } else {
          console.log('Cet avocat n\'est pas associé à un cabinet.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du cabinet :', error);
      }
    );
  }
  loadAssistantsByCabinet(cabinetId : number): void {
    console.log('CabinetID:', cabinetId); // Vérifie si cabinetId est valide
    
   
  
    this.assistantService.getAssistantsByCabinetId(this.cabinetId).subscribe({
      next: (assistants) => {
        console.log('Assistants chargés:', assistants); // Affiche les assistants retournés par l'API
        if (assistants && assistants.length > 0) {
          this.assistants = assistants;
        } else {
          console.log('Aucun assistant trouvé pour ce cabinet.');
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des assistants:', err); // Affiche l'erreur si l'appel échoue
      }
    });
  }
  
}