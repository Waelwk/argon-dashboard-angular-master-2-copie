import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    private apiUrl = 'http://localhost:8080/api/v1/auth';
    private userSubject = new BehaviorSubject<any>(null);
  
    constructor(private http: HttpClient, private router: Router) {}
  
    login(credentials: { email: string; password: string }): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/authenticate`, credentials).pipe(
        map((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role); // Stocker le rôle
          this.userSubject.next(response);
          return response;
          console.log(response);
        })
      );
    }
  
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.userSubject.next(null);
      this.router.navigate(['/login']);
    }
  
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    getRole(): string | null {
      return localStorage.getItem('role');
    }
  
    isAuthenticated(): boolean {
      return !!localStorage.getItem('token')
    }
  }
  