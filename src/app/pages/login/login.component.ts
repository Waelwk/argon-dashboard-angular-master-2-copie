import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Méthode de soumission du formulaire
  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez entrer un email et un mot de passe valides.';
      return;
    }

    this.login();
  }

  // Méthode de connexion
  login() {
    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.errorMessage = '';
  
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.redirectUserBasedOnRole(response.role);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur de connexion', err);
        
        if (err.message === "Votre compte n'est pas activé. Veuillez vérifier votre email pour l'activer.") {
          this.errorMessage = err.message;
        } else {
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      }
    });
  }

  private redirectUserBasedOnRole(role: string) {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/dashboard']);
        break;
      case 'MANAGER':
        this.router.navigate(['/dashboardm']);
        break;
        case 'AVOCAT':
        this.router.navigate(['/dashboardA']);
        break;
        case 'CLIENT':
          this.router.navigate(['/dashboardClient']);
          break;
          case 'ASSISTANT':
            this.router.navigate(['/dashboardAssistant']);
            break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }
}
