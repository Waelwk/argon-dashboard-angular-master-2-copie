import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// Core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../../variables/charts";
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
  
  
  
    
    // Initialisation des données pour les graphiques
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    // Création du graphique des commandes
    var chartOrders = document.getElementById('chart-orders');
    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    // Création du graphique des ventes
    var chartSales = document.getElementById('chart-sales');
    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  // Méthode de déconnexion
  logout() {
    this.authService.logout(); // Appeler le service de déconnexion
    this.router.navigate(['/login']);
    window.location.reload()
  }
}
