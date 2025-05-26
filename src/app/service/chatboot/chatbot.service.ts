import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatRequest {
  message: string;  // changer question -> message
}

export interface ChatResponse {
  response: string;      // texte de la réponse (tu peux ajuster selon backend)
  explanation?: string;  // explication optionnelle
  articles?: any[];      // liste d'articles optionnelle
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8000'; // URL de ton backend FastAPI

  constructor(private http: HttpClient) {}

  askQuestion(request: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, request);
  }

  uploadPdf(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  listPdfs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/pdfs/list`);
  }
}
