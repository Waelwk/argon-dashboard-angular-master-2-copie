import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getRole();

    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']); // Redirection si non connecté
      return false;
    }

    if (route.data['roles'] && !route.data['roles'].includes(userRole)) {
      this.router.navigate(['/']); // Redirection si rôle non autorisé
      return false;
    }

    return true;
  }
}
