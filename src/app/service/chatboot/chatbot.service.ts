import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
  explanation?: string;
  articles?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8000'; // Remplace par ton IP si besoin

  constructor(private http: HttpClient) {}

  /** Envoyer une question au chatbot */
  askQuestion(request: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, request);
  }

  /** Upload d’un ou plusieurs fichiers PDF */
uploadPdf(files: File[]): Observable<any> {
  const formData = new FormData();
  if (files.length > 0) {
    formData.append('file', files[0]); // 'file' correspond au paramètre FastAPI
  }
  return this.http.post(`${this.apiUrl}/pdfs/upload`, formData);
}


  /** Liste des fichiers PDF disponibles */
  listPdfs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/pdfs`);
  }

  /** Supprimer un fichier PDF par son nom */
  deletePdf(pdfName: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/pdfs/${encodeURIComponent(pdfName)}`);
  }
}
