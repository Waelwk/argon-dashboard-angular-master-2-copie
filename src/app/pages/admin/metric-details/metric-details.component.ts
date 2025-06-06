import { Component, OnInit } from '@angular/core';

import { ChartData, ChartOptions } from 'chart.js';
import { MetricDetails, MetricList, StatisticsService } from 'src/app/service/stat/statistics.service';


import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-metric-details',
  templateUrl: './metric-details.component.html'
})
export class MetricDetailsComponent implements OnInit {
  metricNames: string[] = [];
  allMetricsDetails: MetricDetails[] = [];

  chartType: 'line' = 'line';

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };

  constructor(private statsService: StatisticsService) {}

  ngOnInit(): void {
    this.statsService.getMetricsNames().subscribe((res: MetricList) => {
      this.metricNames = res.names;

      // Récupère les détails de toutes les métriques en parallèle
      const observables = this.metricNames.map(name => this.statsService.getMetricDetails(name));

      forkJoin(observables).subscribe(results => {
        this.allMetricsDetails = results;
        this.prepareChartData();
      });
    });
  }

  prepareChartData() {
    // Récupérer la liste complète des labels (statistic) sur toutes les métriques
    const allLabelsSet = new Set<string>();
    this.allMetricsDetails.forEach(metric => {
      metric.measurements.forEach(m => allLabelsSet.add(m.statistic));
    });
    const allLabels = Array.from(allLabelsSet);

    // Préparer les datasets
    const datasets = this.allMetricsDetails.map((metric, index) => {
      // Créer un tableau de valeurs aligné avec allLabels
      const valuesMap = new Map<string, number>();
      metric.measurements.forEach(m => valuesMap.set(m.statistic, m.value));

      const data = allLabels.map(label => valuesMap.get(label) ?? 0);

      // Couleurs simples pour différencier les courbes
      const colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
      ];

      return {
        label: metric.name,
        data,
        fill: false,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
        tension: 0.1
      };
    });

    // Met à jour les données du chart
    this.chartData = {
      labels: allLabels,
      datasets
    };
  }
}
