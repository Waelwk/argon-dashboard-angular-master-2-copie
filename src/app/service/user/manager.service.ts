import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from 'src/app/Models/manager';


@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  getAllUsers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${this.apiUrl}/get`);
  }

  // Ajouter un manager avec un cabinet
  registerManager(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-manager`, request);
  }

  // Mettre à jour un utilisateur
  updateUser(userId: number, request: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, request);
  }
}
