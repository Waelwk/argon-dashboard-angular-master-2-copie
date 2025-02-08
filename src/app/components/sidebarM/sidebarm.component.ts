import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboardm', title: 'Dashboardm',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/dashboardm/profile', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
   
];

@Component({
  selector: 'app-sidebarm',
  templateUrl: './sidebarm.component.html',
  styleUrls: []
})
export class sidebarm implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
