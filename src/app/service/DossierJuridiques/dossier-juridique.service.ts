import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Adjust if needed
import { DossierJuridique } from 'src/app/Models/DossierJuridique';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class DossierJuridiqueService {
  private apiUrl = 'http://localhost:8080/api/dossiersjuridiques';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthToken(): string | null {
    return this.authService.getToken();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  cloturerDossier(id: number, contenuJugement: string): Observable<any> {
    const headers = this.getAuthHeaders(); // Ajout des en-têtes d'authentification
    return this.http.put(`${this.apiUrl}/${id}/cloturer`, { contenuJugement }, { headers });
  }
  // Get all dossiers
  getAllDossiers(): Observable<DossierJuridique[]> {
    return this.http.get<DossierJuridique[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Get dossier by ID
  getDossierById(id: number): Observable<DossierJuridique> {
    return this.http.get<DossierJuridique>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Create a new dossier
  createDossier(dossier: DossierJuridique): Observable<DossierJuridique> {
    return this.http.post<DossierJuridique>(this.apiUrl, dossier, { headers: this.getAuthHeaders() });
  }

  // Update an existing dossier
  updateDossier(id: number, dossier: DossierJuridique): Observable<DossierJuridique> {
    return this.http.put<DossierJuridique>(`${this.apiUrl}/${id}`, dossier, { headers: this.getAuthHeaders() });
  }
  
  // Delete a dossier
  deleteDossier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Consult dossier using codeAcces
  consulterDossier(codeAcces: string): Observable<DossierJuridique> {
    return this.http.get<DossierJuridique>(`${this.apiUrl}/consultation?codeAcces=${codeAcces}`, { headers: this.getAuthHeaders() });
  }
}
