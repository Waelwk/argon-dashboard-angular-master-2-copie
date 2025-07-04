import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-sidebar-assistant',
  templateUrl: './sidebar-assistant.component.html',
  styleUrls: ['./sidebar-assistant.component.css']
})
export class SidebarAssistantComponent implements OnInit {

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