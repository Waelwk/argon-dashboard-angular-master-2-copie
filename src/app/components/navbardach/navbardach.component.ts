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
