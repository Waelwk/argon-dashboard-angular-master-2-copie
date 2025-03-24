import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RendezVous } from 'src/app/Models/RendezVous';


@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  addRendezVous(newRendezVous: RendezVous) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/rendezvous'; // URL du backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthToken(): string | null {
    return this.authService.getToken();
  }

  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Récupérer tous les rendez-vous
  getAllRendezVous(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }
  getRendezVousByAvocat(avocatId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/avocat/${avocatId}`);
  }
  // Demander un rendez-vous
  demanderRendezVous(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/demander`, request, { headers: this.getHeaders() });
  }

  // Accepter un rendez-vous
  accepterRendezVous(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/accepter/${id}`, {}, { headers: this.getHeaders() });
  }

  // Refuser un rendez-vous
  refuserRendezVous(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/refuser/${id}`, {}, { headers: this.getHeaders() });
  }

  // Mettre à jour un rendez-vous
  updateRendezVous(id: number, request: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, request, { headers: this.getHeaders() });
  }

  // Supprimer un rendez-vous
  deleteRendezVous(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers:this.getHeaders() });
  }
}
