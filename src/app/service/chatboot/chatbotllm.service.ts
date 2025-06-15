// src/app/services/chat.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class Chatbotllm {

  private apiUrl = 'http://localhost:5000/chat'; // Assure-toi que le port est correct

  constructor(private http: HttpClient) {}

  sendQuestion(request: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, request);
  }
}
