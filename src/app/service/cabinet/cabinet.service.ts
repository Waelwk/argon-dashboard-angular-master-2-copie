import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cabinet } from 'src/app/Models/cabinet';

@Injectable({
  providedIn: 'root'
})
export class CabinetService {
  private apiUrl = 'http://localhost:8080/api/cabinets'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les cabinets
  getAllCabinets(): Observable<Cabinet[]> {
    return this.http.get<Cabinet[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError)  // Error handling for this request
    );
  }

  // Récupérer un cabinet par ID
  getCabinetById(id: number): Observable<Cabinet> {
    return this.http.get<Cabinet>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)  // Error handling for this request
    );
  }

  // Ajouter un nouveau cabinet
  createCabinet(cabinet: Cabinet): Observable<Cabinet> {
    return this.http.post<Cabinet>(this.apiUrl, cabinet).pipe(
      catchError(this.handleError)  // Error handling for this request
    );
  }

  // Mettre à jour un cabinet
  updateCabinet(id: number, cabinetDetails: Cabinet): Observable<Cabinet> {
    return this.http.put<Cabinet>(`${this.apiUrl}/${id}`, cabinetDetails).pipe(
      catchError(this.handleError)  // Error handling for this request
    );
  }

  // Supprimer un cabinet
  deleteCabinet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)  // Error handling for this request
    );
  }

  // Gestion des erreurs HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur serveur: ${error.status} - ${error.message}`;
    }
    console.error('Erreur API', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
