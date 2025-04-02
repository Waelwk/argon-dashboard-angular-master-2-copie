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
    return this.http.get<Client>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Récupérer tous les clients
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Créer un nouveau client
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  // Mettre à jour un client
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  // Supprimer un client
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}