import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Statistiques personnalisées
export interface Stats {
  [key: string]: number;
}

// ✅ Liste des métriques d’Actuator
export interface MetricList {
  names: string[];
}

// ✅ Détail d’une métrique spécifique
export interface MetricDetails {
  name: string;
  measurements: {
    statistic: string;
    value: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private statisticsUrl = 'http://localhost:8080/api/statistics';
  private actuatorBaseUrl = 'http://localhost:8080/actuator';

  constructor(private http: HttpClient) {}

  // 🔹 Statistiques personnalisées (clients, avocats, dossiers, etc.)
  getStatistics(): Observable<Stats> {
    return this.http.get<Stats>(this.statisticsUrl);
  }

  // 🔹 Liste des métriques exposées par Spring Boot Actuator
  getMetricsNames(): Observable<MetricList> {
    return this.http.get<MetricList>(`${this.actuatorBaseUrl}/metrics`);
  }

  // 🔹 Détails d'une métrique spécifique (par exemple : jvm.memory.used)
  getMetricDetails(name: string): Observable<MetricDetails> {
    return this.http.get<MetricDetails>(`${this.actuatorBaseUrl}/metrics/${name}`);
  }
}
