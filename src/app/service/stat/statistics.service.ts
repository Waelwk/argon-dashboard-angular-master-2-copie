import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stats {
  [key: string]: number;
}

export interface MetricList {
  names: string[];
}

export interface MetricDetails {
  name: string;
  measurements: { statistic: string; value: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  // Stats personnalisées
getStatistics(): Observable<Stats> {
  return this.http.get<Stats>('http://localhost:8080/api/statistics');
}

getMetricsNames(): Observable<MetricList> {
  return this.http.get<MetricList>('http://localhost:8080/actuator/metrics');
}

getMetricDetails(name: string): Observable<MetricDetails> {
  return this.http.get<MetricDetails>(`http://localhost:8080/actuator/metrics/${name}`);
}

  }
