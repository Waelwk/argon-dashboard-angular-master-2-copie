import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-navbarindex',
  templateUrl: './navbarindex.component.html',
  styleUrls: ['./navbarindex.component.css']
})
export class NavbarindexComponent implements OnInit {
  isLoggedIn = false;
  isLoading = true;
  userRole: string | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getRole();
      setTimeout(() => {
    this.isLoading = false;
  }, 1000);
    
  }

  redirectToDashboard(): void {
    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/dashboard']);
    } else if (this.userRole === 'MANAGER') {
      this.router.navigate(['/dashboardm']);
    } else if (this.userRole === 'AVOCAT') {
      this.router.navigate(['/dashboardA/Dossier']);
    } else if (this.userRole === 'ASSISTANT') {
      this.router.navigate(['/dashboardAssistant/Avocat']);
    } else if (this.userRole === 'CLIENT') {
      this.router.navigate(['/dashboardClient/Dossier']);
    } else {
      this.router.navigate(['/']); // Retour à l'accueil par défaut
    }
  }
}
