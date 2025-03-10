import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  email: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Function to handle the password reset email request
  onSubmit(): void {
    if (!this.email) {
      this.errorMessage = "L'email est requis.";
      return;
    }

    this.authService.sendPasswordResetEmail(this.email).subscribe({
      next: (response) => {
        this.message = response.message;  // Success message from the server
      },
      error: (error) => {
        this.errorMessage = error.error.message || "Une erreur s'est produite.";
      }
    });
  }
}