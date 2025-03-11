// avocat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Avocat } from 'src/app/Models/avocat';


@Injectable({
  providedIn: 'root',
})
export class AvocatService {
    private apiUrl = 'http://localhost:8080/api/v1/avocats'

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Récupérer le token via AuthService
  private getAuthToken(): string | null {
    return this.authService.getToken();
  }

  // Ajouter un avocat
  register(request: any): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/register`, request, { headers });
  }

  // Mettre à jour un avocat
  updateAvocat(avocatId: number, request: any): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${avocatId}`, request, { headers });
  }

  // Archiver un avocat
  archiveAvocat(avocatId: number): Observable<void> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/${avocatId}/archive`, {}, { headers });
  }

  // Désarchiver un avocat
  desarchiveAvocat(avocatId: number): Observable<void> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/${avocatId}/desarchive`, {}, { headers });
  }
// Obtenir un avocat par ID
getAvocatById(avocatId: number): Observable<Avocat> {
  const token = this.getAuthToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Avocat>(`${this.apiUrl}/${avocatId}`, { headers, withCredentials: true });
}

  // Obtenir tous les avocats
  getAllAvocats(): Observable<Avocat[]> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Avocat[]>(this.apiUrl, { headers , withCredentials: true});
  }
}
