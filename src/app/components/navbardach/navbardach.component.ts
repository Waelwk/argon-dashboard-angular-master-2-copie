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
      this.editLink = '/dashboard/admin/edit';
      break;
    case 'CLIENT':
      this.editLink = '/dashboard/client/edit';
      break;
    case 'AVOCAT':
      this.editLink = '/dashboard/avocat/edit';
      break;
    case 'MANAGER':
      this.editLink = '/dashboard/manager/edit';
      break;
      case 'ASSISTANT':
        this.editLink = '/dashboard/assistant/edit';
        break;
    default:
      this.editLink = '/dashboard/profile'; // fallback
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
