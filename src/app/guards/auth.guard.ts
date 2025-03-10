import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getRole();

    // Si l'utilisateur est déjà connecté et essaie d'accéder aux pages login ou register
    if (isAuthenticated && (state.url.includes('/auth/login') || state.url.includes('/auth/register')|| state.url.includes('/auth/resetPasword'))) {
      // Rediriger vers le dashboard ou la page d'accueil
      return this.router.createUrlTree(['/dashboard']);
    }

    // Si l'utilisateur n'est pas authentifié, il ne peut pas accéder à d'autres pages sauf login ou register
    if (!isAuthenticated && !state.url.includes('/auth/login') && !state.url.includes('/auth/register')&& !state.url.includes('/auth/resetPasword')) {
      return this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } }); // Rediriger vers la page login
    }

    // Si l'utilisateur a le rôle approprié pour accéder à la route
    if (route.data['roles'] && !route.data['roles'].includes(userRole)) {
      return this.router.createUrlTree(['/']); // Rediriger si rôle non autorisé
    }

    return true;
  }
}
