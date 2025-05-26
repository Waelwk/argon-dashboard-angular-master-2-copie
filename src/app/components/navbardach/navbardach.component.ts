import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbardach.component.html',
  styleUrls: ['./navbardach.component.css']
})
export class NavbardachComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  role!: string | null;
  id!: string | null;
  email!: string | null;
  prenom!: string | null;
  nom!: string | null;
  editLink!: string;
  constructor(location: Location,  private element: ElementRef, private router: Router , private authService: AuthService,) {
    this.location = location;
    
  }
  ngOnInit() {
    this.authService.testTokenDecoding();
    // Vérifier l'authentification à chaque chargement du composant
    if (this.authService.isTokenExpired(this.authService.getToken())) {
      this.authService.logout(); // Déconnecter l'utilisateur
  
    

 
    this.listTitles = ROUTES.filter(listTitle => listTitle);

  }
  this.role = localStorage.getItem('role');
  this.id = localStorage.getItem('id');
  this.email = localStorage.getItem('email');
  this.prenom = localStorage.getItem('prenom');
  this.nom = localStorage.getItem('nom');
  switch (this.role) {
    case 'ADMIN':
      this.editLink = '/dashboardA/EditProfil';
      break;
    case 'CLIENT':
      this.editLink = '/dashboardClient/EditProfile';
      break;
    case 'AVOCAT':
      this.editLink = '/dashboardA/EditProfil';
      break;
    case 'MANAGER':
      this.editLink = '/dashboardm/EditProfile';
      break;
      case 'ASSISTANT':
        this.editLink = '/dashboardAssistant/EditProfile';
        break;
    
  }
} 
ngAfterViewInit() {
  setTimeout(() => {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      (backdrop as HTMLElement).style.zIndex = '100';
    }
  }, 500); // Attendre un peu après l'affichage de la modal
}
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  logout() {
    this.authService.logout(); // Appeler le service de déconnexion
    this.router.navigate(['/login']);
    window.location.reload()
  }
}
