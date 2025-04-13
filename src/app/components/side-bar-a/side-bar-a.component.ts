import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-side-bar-a',
  templateUrl: './side-bar-a.component.html',
  styleUrls: ['./side-bar-a.component.css']
})
export class SideBarAComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
    
  
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        (backdrop as HTMLElement).style.zIndex = '100';
      }
    }, 500); // Attendre un peu après l'affichage de la modal
  }
logout() {
  this.authService.logout(); // Appeler le service de déconnexion
  this.router.navigate(['/login']);
  window.location.reload()
}}