import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:8080/api/documents'; // Your Spring Boot API URL

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject the AuthService
  ) {}

  // Method to get the Authorization token
  private getAuthToken(): string | null {
    return this.authService.getToken(); // Get the token from AuthService
  }

  // Method to get headers with Authorization
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Upload a document
  uploadDocument(file: File, dossierId?: number, dossierUpdateId?: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    if (dossierId) {
      formData.append('dossierId', dossierId.toString());
    }
    if (dossierUpdateId) {
      formData.append('dossierUpdateId', dossierUpdateId.toString());
    }

    return this.http.post<any>(`${this.apiUrl}/upload`, formData, { headers: this.getHeaders() });
  }

  // Get a document by ID
  getDocumentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Download a document
  downloadDocument(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, { responseType: 'blob', headers: this.getHeaders() });
  }

  // Get documents by dossier ID
  getDocumentsByDossierId(dossierId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dossier/${dossierId}`, { headers: this.getHeaders() });
  }
  getDocumentsByDossierUpdateId(dossierUpdateId: number): Observable<any> {
    const url = `${this.apiUrl}/dossierUpdate/${dossierUpdateId}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }  
 
}

