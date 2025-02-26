import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from 'src/app/Models/manager';


@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  deleteUser(managerId: number) {
    throw new Error('Method not implemented.');
  }
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
  desarchiveUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}/desArchivee`;
    return this.http.put(url, {}, { responseType: 'text' }); // Retourne une réponse textuelle
  }
  archiveUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}/Archivee`;
    return this.http.put(url, {}, { responseType: 'text' }); // Retourne une réponse textuelle
  }
  // Mettre à jour un utilisateur
  updateUser(userId: number, request: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, request);
  }
}
