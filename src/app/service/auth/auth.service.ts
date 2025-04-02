import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Correction de l'importation

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private userSubject = new BehaviorSubject<any>(null);
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState(); // Initialiser l'état d'authentification au démarrage
  }

  // Initialiser l'état d'authentification
  private initializeAuthState(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      const decodedToken: any = jwtDecode(token);
      this.userSubject.next(decodedToken); // Mettre à jour l'état avec les données utilisateur
    } else {
      this.logout(); // Si le token est expiré ou absent, se déconnecter immédiatement
    }
  }  sendPasswordResetEmail(email: string): Observable<any> {
    const requestBody = { email };
    return this.http.post(`${this.apiUrl}/send-password-reset-email`, requestBody);
  }


  // Méthode de login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap((response) => {
        if (response.message === "Votre compte n'est pas activé. Veuillez vérifier votre email pour l'activer.") {
          throw new Error(response.message); // Convertit en erreur pour le flux error
        }
        
        // Si le compte est activé, procéder au stockage des informations
        this.saveToken(response.access_token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('id', response.id);
        localStorage.setItem('email', response.email);
        localStorage.setItem('prenom', response.firstname);
        localStorage.setItem('nom', response.lastname);
        
        const decodedToken: any = jwtDecode(response.access_token);
        this.userSubject.next(decodedToken);
      }),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        return throwError(() => error);
      })
    );
  }
  // Sauvegarder le token
  private saveToken(jwt: string): void {
    localStorage.setItem('access_token', jwt);
    this.token = jwt;
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.token = null;
    this.userSubject.next(null); // Réinitialiser l'état d'authentification
  
  }

  // Tester le décodage du token
  testTokenDecoding(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Token décodé :', decodedToken);
        console.log('Token expiré :', this.isTokenExpired(token));
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
    } else {
      console.log('Aucun token disponible.');
    }
  }

  // Vérifier si le token est expiré
  isTokenExpired(token: string): boolean {
    if (!token) {
      return true; // Pas de token, donc considéré comme expiré
    }
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000; // Convertir en millisecondes
      return Date.now() > expirationDate;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return true;
    }
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Récupérer le token depuis le localStorage
  getToken(): string | null {

    return localStorage.getItem('access_token');

  }

  // Récupérer le rôle utilisateur
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  // Obtenir l'état d'authentification en temps réel
  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  // Vérifier l'expiration du token et rediriger si nécessaire
  checkTokenExpiration(): void {
    const token = this.getToken();
    if (token && this.isTokenExpired(token)) {
      this.logout(); // Si le token est expiré, rediriger vers login
    }
  }

  // Enregistrer un client
  registerClient(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, clientData);
  }

  // Enregistrer un cabinet
  registerCabinet(cabinetData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-manager`, cabinetData);
  }
  


}