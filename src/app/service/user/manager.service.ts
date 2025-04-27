import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from 'src/app/Models/manager';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/Models/user';


@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  deleteUser(managerId: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private apiUrl2 = 'http://localhost:8080/api/v1/managers';
  constructor(private http: HttpClient , private authService: AuthService) {}
 // Récupérer le token via AuthService
 private getAuthToken(): string | null {
  return this.authService.getToken();
}
  // Récupérer tous les utilisateurs
   // Get all users (managers in this case)
   getAllUsers(): Observable<Manager[]> {
    const token = this.getAuthToken();  // Get the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Add the token to the header
    const url = `${this.apiUrl2}/all`; // The URL to fetch all users (managers)
    return this.http.get<Manager[]>(url, { headers }); // Send GET request with headers
  }
  getUserByIdd(id: number): Observable<User> {
    
    return this.http.get<User>(`http://localhost:8080/api/v1/auth/users/${id}`);
  }
  
  getAllManagers(): Observable<Manager[]> {
    const token = this.getAuthToken();  // Récupération du token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajout du token aux headers
    const url = `${this.apiUrl2}/all`; // URL : /api/v1/managers/{id}
    return this.http.get<Manager[]>(url);
  }

  // Ajouter un manager avec un cabinet
  registerManager(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-manager`, request);
  }
  archiveUser(userId: number): Observable<any> {
    const token = this.getAuthToken();  // Get the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Add the token to the header
    const url = `${this.apiUrl2}/${userId}/Archivee`;
    return this.http.put(url, {}, { headers, responseType: 'text' }); // Return a textual response
  }

  // Unarchive a user
  desarchiveUser(userId: number): Observable<any> {
    const token = this.getAuthToken();  // Get the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Add the token to the header
    const url = `${this.apiUrl2}/${userId}/desArchivee`;
    return this.http.put(url, {}, { headers, responseType: 'text' }); // Return a textual response
  }

  // Mettre à jour un utilisateur
  updateUser(userId: number, request: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, request);

  }
  // Récupérer un manager par ID
getUserById(id: number): Observable<Manager> {
  const token = this.getAuthToken();  // Récupération du token
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajout du token aux headers
  const url = `${this.apiUrl2}/${id}`; // URL : /api/v1/managers/{id}
  return this.http.get<Manager>(url, { headers }); // Requête GET
}

}
