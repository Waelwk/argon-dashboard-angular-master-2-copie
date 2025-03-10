import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assistant } from 'src/app/Models/assistant';
import { Avocat } from 'src/app/Models/avocat';
import { Cabinet } from 'src/app/Models/cabinet';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';
import { CabinetService } from 'src/app/service/cabinet/cabinet.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetMComponent implements OnInit {
 cabinetId: number;
  cabinet: Cabinet;  // Le cabinet du gestionnaire
  assistants: Assistant[] = []; // Liste des assistants filtrés
  avocats: Avocat[] = []; // Liste des avocats filtrés

  constructor(
    private avocatService: AvocatService,
    private assistantService: AssistantService,
    private route: ActivatedRoute,
    private cabinetService: CabinetService,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.loadCabinetAndAssociates();
    this.cabinet;
  }
  
  // Charger le cabinet du gestionnaire et ses assistants/avocats
  loadCabinetAndAssociates(): void {
    this.cabinetService.getAllCabinets().subscribe({
      next: (data) => {
        // Récupérer l'ID du gestionnaire
        const managerId = this.getManagerIdFromLocalStorage();
        
        // Trouver le cabinet correspondant à l'ID du gestionnaire
        this.cabinet = data.find(cabinet => cabinet.manager.id === managerId);
        
        if (this.cabinet) {
          this.cabinetId = this.cabinet.id;
          console.log('Cabinet trouvé:', this.cabinet);
          this.loadAssistantsByCabinetId(this.cabinet.id); // Charger les assistants du cabinet
          this.loadAvocatsByCabinetId(this.cabinet.id); // Charger les avocats du cabinet
        } else {
          console.log('Aucun cabinet trouvé pour ce gestionnaire.');
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des cabinets :', err);
      }
    });
  }

  // Récupérer l'ID du gestionnaire depuis le localStorage
  getManagerIdFromLocalStorage(): number {
    const managerId = localStorage.getItem('id');
    return managerId ? Number(managerId) : null;
  }

  // Charger les assistants pour ce cabinet spécifique
  loadAssistantsByCabinetId(cabinetId: number): void {
    this.assistantService.getAllAssistant().subscribe(
      (data) => {
        console.log('Assistants reçus:', data);
        this.assistants = data.filter(assistant => assistant.cabinet && assistant.cabinet.id === cabinetId);
        console.log('Assistants filtrés:', this.assistants);
      },
      (error) => {
        console.error('Erreur lors du chargement des assistants:', error);
      }
    );
  }

  // Charger les avocats pour ce cabinet spécifique
  loadAvocatsByCabinetId(cabinetId: number): void {
    this.avocatService.getAllAvocats().subscribe(
      (data) => {
        console.log('Avocats reçus:', data);
        this.avocats = data.filter(avocat => avocat.cabinet && avocat.cabinet.id === cabinetId);
        console.log('Avocats filtrés:', this.avocats);
      },
      (error) => {
        console.error('Erreur lors du chargement des avocats:', error);
      }
    );
  }

}
