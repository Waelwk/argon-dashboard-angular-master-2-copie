import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CabinetService } from 'src/app/service/cabinet/cabinet.service';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';
import { Avocat } from 'src/app/Models/avocat';
import { Assistant } from 'src/app/Models/assistant';
import { DossierJuridiqueService } from 'src/app/service/DossierJuridiques/dossier-juridique.service';
@Component({
  selector: 'app-cabinet-info',
  templateUrl: './cabinet-info.component.html',
  styleUrls: ['./cabinet-info.component.css']
})
export class CabinetInfoComponent implements OnInit {

  cabinetId: number;
  cabinet: any; // Remplacez `any` par le type de votre objet Cabinet
  cabinets: any[] = []; // Liste de tous les cabinets
  Assistant:Assistant[];
  avocats:Avocat[];
  errorMessage: string;
  dossiers: any[] = []; // Liste des dossiers

  constructor(private dossierService: DossierJuridiqueService, private avocatService: AvocatService, private AssistantService:AssistantService,private route: ActivatedRoute,private cabinetService: CabinetService, private authService:AuthService,) { }

  ngOnInit(): void {
    // Récupérer l'ID du cabinet depuis l'URL
    this.cabinetId = +this.route.snapshot.paramMap.get('id');
 //   console.log('avocats :', this.avocats);
    this.loadAssistantsByCabinetId(this.cabinetId);
    // Charger tous les cabinets
    this.loadCabinets();
    this.loadAvocatsByCabinetId(this.cabinetId);
   this.getAllDossiers()
  }

  // Charger tous les cabinets
  loadCabinets(): void {
    this.cabinetService.getAllCabinets().subscribe({
      next: (data) => {
        this.cabinets = data; // Stocker la liste des cabinets
        this.filterCabinetById(); // Filtrer le cabinet par ID
      },
      error: (err) => {
        console.error('Erreur lors du chargement des cabinets :', err);
      }
    });
  }

  // Filtrer le cabinet par ID
  filterCabinetById(): void {
    this.cabinet = this.cabinets.find(cabinet => cabinet.id === this.cabinetId);
    if (this.cabinet) {
      console.log('Détails du cabinet :', this.cabinet);
    } else {
      console.error('Cabinet non trouvé avec l\'ID :', this.cabinetId);
    }


  }
  loadAssistantsByCabinetId(cabinetId: number): void {
    this.AssistantService.getAllAssistant().subscribe(
      (data) => {
        console.log('Données reçues:', data); // Vérifie les données complètes
        console.log('ID Cabinet recherché:', cabinetId, 'Type:', typeof cabinetId);

        if (data && Array.isArray(data)) {
          this.Assistant = data.filter(assistant => 
            assistant.cabinet && Number(assistant.cabinet.id) === Number(cabinetId)
          );

          console.log('Résultat filtré:', this.Assistant); // Vérifie le résultat filtré
        } else {
          console.error('Données incorrectes:', data);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des assistants:', error);
      }
    );
}
loadAvocatsByCabinetId(cabinetId: number): void {
  this.avocatService.getAllAvocats().subscribe(
    (data) => {
      console.log('Données reçues:', data); // Vérifie les données complètes
      console.log('ID Cabinet recherché:', cabinetId, 'Type:', typeof cabinetId);

      if (data && Array.isArray(data)) {
        this.avocats = data.filter(avocat => 
          avocat.cabinet && Number(avocat.cabinet.id) === Number(cabinetId)
        );

        console.log('Résultat filtré:', this.avocats); // Vérifie le résultat filtré
      } else {
        console.error('Données incorrectes:', data);
      }
    },
    (error) => {
      console.error('Erreur lors du chargement des avocats:', error);
    }
  );
}



getAllDossiers(): void {
  this.dossierService.getAllDossiers().subscribe(
    (data) => {
      // Filtrer les dossiers en fonction de l'ID du cabinet
      this.dossiers = data.filter(dossier => dossier.cabinet.id === this.cabinetId);
      console.log('Dossierss filtrés:', this.dossiers);
    },
    (error) => {
      this.errorMessage = 'Erreur lors du chargement des dossiers.';
    }
  );
}
}