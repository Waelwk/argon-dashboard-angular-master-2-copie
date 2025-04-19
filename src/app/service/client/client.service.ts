// src/app/services/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/app/Models/client';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `http://localhost:8080/api/clients`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthToken(): string | null {
    return this.authService.getToken();
  }

  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  // Récupérer un client par son ID
  getClientById(id: number): Observable<Client> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Client>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
 // 🔹 Enregistrer un nouveau client
 Create(clientData: Client): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, clientData, { headers: this.getHeaders() });
  }
  // Récupérer tous les clients
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }


  // Mettre à jour un client

  updateClient(id: number, clientData: Client): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, clientData, { headers: this.getHeaders() });
  }

  // Supprimer un client
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }// 🔹 Archiver un client
  archiveClient(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/archive/${id}`, {}, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json' // Indiquer que la réponse est du texte brut
    });
  }
  

  desarchiveClient(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/desarchive/${id}`, {}, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json' // Indiquer que la réponse est du texte brut
    });
  }
  
}