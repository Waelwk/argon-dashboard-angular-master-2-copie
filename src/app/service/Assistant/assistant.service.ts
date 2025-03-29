import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { Avocat } from "src/app/Models/avocat";
import { Assistant } from "src/app/Models/assistant";

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
    private apiUrl = 'http://localhost:8080/api/v1/assistant'

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
  updateAssistant(assistantId: number, request: any): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${assistantId}`, request, { headers });
  }
  getAssistantById(id: number): Observable<Assistant> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Assistant>(`${this.apiUrl}/${id}`, { headers, withCredentials: true });
  }
  // Archiver un avocat
//   archiveAssistant(assistantId: number): Observable<void> {
//     const token = this.getAuthToken();
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.post<void>(`${this.apiUrl}/${assistantId}/archive`, {}, { headers });
//   }
  // Archiver un avocat
  archiveAssistant(assistantId: number): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  
    return this.http.post(`${this.apiUrl}/${assistantId}/archive`, {}, { headers, responseType: 'text' });
  }
  
  // Désarchiver un avocat
  desarchiveAssistant(assistantId: number): Observable<string> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<string>(`${this.apiUrl}/${assistantId}/desarchive`, {}, { headers, responseType: 'text' as 'json' });
  }
  

  // Obtenir tous les avocats
  getAllAssistant(): Observable<Assistant[]> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Assistant[]>(this.apiUrl, { headers , withCredentials: true});
  }
}
