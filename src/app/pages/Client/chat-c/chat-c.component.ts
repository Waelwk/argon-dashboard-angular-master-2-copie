import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/Models/message';
import { User } from 'src/app/Models/user';
import { AccessCodeService } from 'src/app/service/access-code /access-code.service';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';
import { MessageService } from 'src/app/service/chat/message.service';

@Component({
  selector: 'app-chat-c',
  templateUrl: './chat-c.component.html',
  styleUrls: ['./chat-c.component.css']
})
export class ChatCComponent implements OnInit {

  users: User[] = [];
  avocatsDossier: User[] = []; // Liste des avocats du client
  selectedUser?: User;
  messages: Message[] = [];
  newMessage = '';
  currentUserId: number;
  currentUserAvatar?: string;

  loading = false;
  error: string | null = null;
  codes: any[] = [];
  dossiers: any[] = [];

  constructor(
    private messageService: MessageService,
    private avocatService: AvocatService,
    private accessCodeService: AccessCodeService // pour récupérer les avocats du dossier
  ) {}

  ngOnInit() {
    this.currentUserId = Number(localStorage.getItem('id'));
    this.loadData(); // Récupérer les avocats liés au client
    this.messageService.getPartners(this.currentUserId).subscribe(users => this.users = users);

  }

  loadData(): void {
    this.loading = true;
    this.error = null;
    this.codes = [];
    this.dossiers = [];
    this.avocatsDossier = [];

    this.accessCodeService.getCompleteData(this.currentUserId).subscribe({
      next: ({ codes, dossiers }) => {
        this.codes = codes;
        this.dossiers = dossiers;

        const avocatsMap = new Map();
        this.dossiers.forEach(dossier => {
          const avocat = dossier.avocat;
          if (avocat && !avocatsMap.has(avocat.id)) {
            avocatsMap.set(avocat.id, avocat);
          }
        });

        this.avocatsDossier = Array.from(avocatsMap.values());
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur lors du chargement des données:', err);
        this.error = 'Impossible de charger les données';
      }
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.loadMessages();
  }

  loadMessages() {
    if (!this.selectedUser) return;

    this.messageService.getConversation(this.currentUserId, this.selectedUser.id).subscribe(msgs => {
      this.messages = msgs;
    });
  }

  selectUserById(event: Event) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    const avocat = this.avocatsDossier.find(a => a.id === selectedId);
    if (avocat) {
      this.selectUser(avocat);
    }
  }

  send() {
    if (!this.newMessage.trim() || !this.selectedUser) return;

    const message: Message = {
      senderId: this.currentUserId,
      receiverId: this.selectedUser.id,
      content: this.newMessage
    };

    this.messageService.sendMessage(message).subscribe(sent => {
      this.messages.push(sent);
      this.newMessage = '';
    });
  }
}