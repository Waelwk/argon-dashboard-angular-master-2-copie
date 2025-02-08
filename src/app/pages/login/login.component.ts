import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez entrer un email et un mot de passe.';
      return;
    }
    this.login();
  }
  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        if (response.role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if (response.role === 'MANAGER') {
          this.router.navigate(['/dashboardm']);
        } else {
          this.router.navigate(['/auth/login']);
        }
  
        // Si le message indique que le compte n'est pas activé
        if (response.message === "Votre compte n'est pas activé. Veuillez vérifier votre email pour l'activer.") {
          this.errorMessage = response.message; // Affichage du message d'erreur
        }
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
      },
    });
  }
}  