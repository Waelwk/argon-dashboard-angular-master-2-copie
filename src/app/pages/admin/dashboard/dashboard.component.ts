import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

// Core components

import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart: any;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public isAuthenticated: boolean = false; // Suivi de l'état d'authentification

  constructor(private authService: AuthService,  private router: Router) {}

  ngOnInit() {
    this.authService.testTokenDecoding();
    // Vérifier l'authentification à chaque chargement du composant
    if (this.authService.isTokenExpired(this.authService.getToken())) {
      this.authService.logout(); // Déconnecter l'utilisateur
  
    

    }
  
  
  
  }}

