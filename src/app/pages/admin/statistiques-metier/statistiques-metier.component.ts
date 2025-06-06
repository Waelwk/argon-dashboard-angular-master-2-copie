import { Component, OnInit } from '@angular/core';


import { ChartData, ChartOptions } from 'chart.js';
import { StatisticsService } from 'src/app/service/stat/statistics.service';

// Define a type for your statistics data
interface Stats {
  [key: string]: number;
}

@Component({
  selector: 'app-statistiques-metier',
  templateUrl: './statistiques-metier.component.html'
})
export class StatistiquesMetierComponent implements OnInit {
  stats: Stats = {};
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Statistiques Métiers',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      }
    ]
  };
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: { 
      y: { beginAtZero: true } 
    }
  };

  constructor(private statsService: StatisticsService) {}

  ngOnInit(): void {
    this.statsService.getStatistics().subscribe(data => {
      this.stats = data;
      this.barChartData.labels = Object.keys(data);
      this.barChartData.datasets[0].data = Object.values(data);
    });
  }
}
