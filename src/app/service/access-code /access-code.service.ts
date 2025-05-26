import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, switchMap, map, catchError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { AccessCode } from 'src/app/Models/AccessCode';
import { DossierJuridique } from 'src/app/Models/DossierJuridique';

@Injectable({
  providedIn: 'root'
})
export class AccessCodeService {
  private apiUrl = `http://localhost:8080/api/access-codes`;
  private dossierApiUrl = `http://localhost:8080/api/dossiersjuridiques`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // ✅ Récupérer le token d'authentification
  private getAuthToken(): string | null {
    return this.authService.getToken(); 
  }

  // ✅ Générer les headers avec le token JWT
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  // ✅ Ajouter un code d'accès pour un client
  addAccessCode(clientId: number, code: string): Observable<AccessCode> {
    return this.http.post<AccessCode>(`${this.apiUrl}/add`, { clientId, code }, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // ✅ Récupérer tous les codes d'accès d'un client spécifique
  getAccessCodesByClientId(clientId: number): Observable<AccessCode[]> {
    return this.http.get<AccessCode[]>(`${this.apiUrl}/client/${clientId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // ✅ Récupérer les dossiers associés à un tableau de codes
  getDossiersByCodes(codes: string[]): Observable<DossierJuridique[]> {
    return this.http.post<DossierJuridique[]>(`${this.dossierApiUrl}/par-codes`, codes, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // ✅ Méthode combinée pour récupérer les codes puis les dossiers associés
  getCompleteData(clientId: number): Observable<{ codes: AccessCode[], dossiers: DossierJuridique[] }> {
    return this.getAccessCodesByClientId(clientId).pipe(
      switchMap(codes => {
        const codeValues = codes.map(c => c.code); // Extraction des codes
        if (codeValues.length === 0) {
          return throwError(() => new Error('Aucun code disponible.'));
        }

        return this.getDossiersByCodes(codeValues).pipe(
          map(dossiers => ({
            codes: codes,
            dossiers: dossiers || [] 
          })),
          catchError(error => {
            console.error('Erreur lors de la récupération des dossiers', error);
            return throwError(() => new Error('Erreur lors de la récupération des dossiers.'));
          })
        );
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des codes', error);
        return throwError(() => new Error('Erreur lors de la récupération des codes.'));
      })
    );
  }

  // ✅ Gestion des erreurs centralisée
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.status === 403) {
      errorMessage = 'Accès refusé - Vérifiez vos permissions';
      this.authService.logout();
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      errorMessage = `Erreur serveur: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  deleteAccessCode(id: number): Observable<string> {
    const url = `${this.apiUrl}/delete/${id}`;
    const headers = this.getHeaders();
    return this.http.delete<string>(url, { headers });
  }
  
}
