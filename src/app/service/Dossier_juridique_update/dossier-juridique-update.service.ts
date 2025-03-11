import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DossierJuridiqueUpdate } from 'src/app/Models/DossierJuridiqueUpdate';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DossierJuridiqueUpdateService {

  private apiUrl = 'http://localhost:8080/api/dossiersjuridiques';  // URL de base de l'API Spring

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthToken(): string | null {
    return this.authService.getToken();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Méthode pour créer une mise à jour
  createUpdate(dossierId: number, update: DossierJuridiqueUpdate): Observable<DossierJuridiqueUpdate> {
    const url = `${this.apiUrl}/${dossierId}/update`;
    return this.http.post<DossierJuridiqueUpdate>(url, update, { headers: this.getAuthHeaders() });
  }

  // Méthode pour récupérer une mise à jour par son ID
  getUpdateById(id: number): Observable<DossierJuridiqueUpdate> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.get<DossierJuridiqueUpdate>(url, { headers: this.getAuthHeaders() });
  }

  // Méthode pour récupérer toutes les mises à jour pour un dossier
  getAllUpdates(dossierId: number): Observable<DossierJuridiqueUpdate[]> {
    const url = `${this.apiUrl}/${dossierId}/updates`;
    return this.http.get<DossierJuridiqueUpdate[]>(url, { headers: this.getAuthHeaders() });
  }

  // Méthode pour mettre à jour une mise à jour
  updateDossierUpdate(id: number, update: DossierJuridiqueUpdate): Observable<DossierJuridiqueUpdate> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.put<DossierJuridiqueUpdate>(url, update, { headers: this.getAuthHeaders() });
  }

  // Méthode pour supprimer une mise à jour
  deleteDossierUpdate(id: number): Observable<void> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }

  // Méthode pour récupérer tous les dossiers
  getAllDossiers(): Observable<DossierJuridiqueUpdate[]> {
    return this.http.get<DossierJuridiqueUpdate[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
}
