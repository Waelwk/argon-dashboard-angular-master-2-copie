import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Vérifier si le token est expiré
    if (token && this.authService.isTokenExpired(token)) {
      this.authService.logout(); // Déconnecter l'utilisateur
      this.router.navigate(['/auth/login']); // Rediriger vers la page de login
      return new Observable<HttpEvent<any>>(); // Arrêter la requête
    }

    // Ajouter le token à l'en-tête de la requête
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
