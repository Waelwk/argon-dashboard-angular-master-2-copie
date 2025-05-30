import { Component, OnInit } from '@angular/core';

import { ChartDataset, ChartOptions } from 'chart.js';
import { StatisticsService, Stats } from 'src/app/service/stat/statistics.service';

@Component({
  selector: 'app-stats-chart',
  templateUrl: './stats-chart.component.html'
})
export class StatsChartComponent implements OnInit {
  public barChartLabels: string[] = [];
  public barChartData: ChartDataset[] = [{ data: [], label: 'Statistiques' }];
  public barChartOptions: ChartOptions = { responsive: true };

  constructor(private statsService: StatisticsService) {}

  ngOnInit(): void {
    this.statsService.getStatistics().subscribe((data: Stats) => {
      this.barChartLabels = Object.keys(data);
      this.barChartData[0].data = Object.values(data);
    });
  }
}
