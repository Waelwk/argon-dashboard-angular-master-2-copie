import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/dashboard/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/dashboard/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/dashboard/user-profile', title: 'Use profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/dashboard/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/auth/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/dashboard/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
    
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
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