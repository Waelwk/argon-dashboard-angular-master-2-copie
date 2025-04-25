import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'src/app/Models/message';
import { User } from 'src/app/Models/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/messages';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // 🔒 Obtenir le token d'authentification
  private getAuthToken(): string | null {
    return this.authService.getToken(); // Appel à ton AuthService pour récupérer le token
  }

  // 📬 Récupérer l'historique de la conversation entre 2 utilisateurs
  getConversation(senderId: number, receiverId: number): Observable<Message[]> {
    const params = new HttpParams()
      .set('senderId', senderId.toString())
      .set('receiverId', receiverId.toString());

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);

    return this.http.get<Message[]>(`${this.apiUrl}/conversation`, { params, headers });
  }

  // 📨 Envoyer un message
  sendMessage(message: Message): Observable<Message> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);

    return this.http.post<Message>(`${this.apiUrl}/send`, message, { headers });
  }

  // 👥 Obtenir la liste des utilisateurs avec qui l’utilisateur a discuté
  getPartners(userId: number): Observable<User[]> {
    const params = new HttpParams().set('userId', userId.toString());
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);

    return this.http.get<User[]>(`${this.apiUrl}/partners`, { params, headers });
  }
}
