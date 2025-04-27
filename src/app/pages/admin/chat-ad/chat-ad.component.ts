import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/Models/message';
import { User } from 'src/app/Models/user';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';
import { MessageService } from 'src/app/service/chat/message.service';
import { ManagerService } from 'src/app/service/user/manager.service';

@Component({
  selector: 'app-chat-ad',
  templateUrl: './chat-ad.component.html',
  styleUrls: ['./chat-ad.component.css']
})
export class ChatAdComponent implements OnInit {
  
  assistants: User[] = [];  // Liste des assistants
  managers: User[] = [];  // Liste des managers

  users: User[] = [];
  selectedUser?: User;
  messages: Message[] = [];
  newMessage = '';
  currentUserId: number; // ID de l'utilisateur connecté

  AdminID: number; // ID de l'administrateur
  currentUserAvatar?: string; // Avatar de l'utilisateur connecté
  cabinetId: number;

  constructor(
    private messageService: MessageService,
    private avocatService: AvocatService,
    private assistantService: AssistantService,
    private managerService: ManagerService  // Injection du service Manager
  ) {}

  ngOnInit() {
    this.AdminID = Number(localStorage.getItem('id'));  // Récupérer l'ID de l'utilisateur connecté
    this.messageService.getPartners(this.AdminID).subscribe(users => this.users = users);
    
    // Récupérer la liste des managers
    this.managerService. getAllManagers().subscribe(managers => {
      this.managers = managers;
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.loadMessages();
  }

  loadMessages() {
    if (!this.selectedUser) return;

    this.messageService.getConversation(this.AdminID, this.selectedUser.id).subscribe(msgs => {
      this.messages = msgs;
    });
  }

  selectUserById(event: Event) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
  
    // Si vous voulez gérer uniquement les managers
    const manager = this.managers.find(m => m.id === selectedId);
    if (manager) {
      this.selectUser(manager);
    }
  
   
  }
  

  send() {
    if (!this.newMessage.trim()) return;
    const message: Message = {
      senderId: this.AdminID,
      receiverId: this.selectedUser!.id,
      content: this.newMessage
    };
    this.messageService.sendMessage(message).subscribe(sent => {
      this.messages.push(sent);
      this.newMessage = '';
    });
  }
}
