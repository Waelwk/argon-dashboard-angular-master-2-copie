import { Component, OnInit } from '@angular/core';
import { Cabinet } from 'src/app/Models/cabinet';
import { CabinetService } from 'src/app/service/cabinet/cabinet.service';


@Component({
  selector: 'app-cabinet-list',
  templateUrl: './cabinet-list.component.html',
  styleUrls: ['./cabinet-list.component.css']
})
export class CabinetListComponent implements OnInit {
  cabinets: Cabinet[] = [];
  errorMessage = '';

  constructor(private cabinetService: CabinetService) {}

  ngOnInit(): void {
    this.loadCabinets();
  }

  loadCabinets(): void {
    this.cabinetService.getAllCabinets().subscribe({
      next: data => this.cabinets = data,
      error: err => this.errorMessage = err.message
    });
  }
}
