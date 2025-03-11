import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DossierJuridiqueUpdate } from 'src/app/Models/DossierJuridiqueUpdate';
import { RendezVous } from 'src/app/Models/RendezVous';
import { DossierJuridiqueUpdateService } from 'src/app/service/Dossier_juridique_update/dossier-juridique-update.service';

@Component({
  selector: 'app-dossier-juridique-update',
  templateUrl: './dossier-juridique-update.component.html',
  styleUrls: ['./dossier-juridique-update.component.css']
})
export class DossierJuridiqueUpdateComponent implements OnInit {
 
  dossierId: number = 1; // ID du dossier pour lequel on souhaite afficher les mises à jour
  updates: DossierJuridiqueUpdate[] = [];
  newUpdate: DossierJuridiqueUpdate = {
    id: 0,
    dossierJuridique: undefined,
    evaluation: '',
    demandeDocuments: false,
    rendezVous: new RendezVous,
    note: '',
    dateCreation: undefined
  };
  selectedUpdate: DossierJuridiqueUpdate | null = null;
  idD: any;
  
  id: number;
  DossierId: number;

  constructor(private dossierUpdateService: DossierJuridiqueUpdateService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("ngOnInit appelé"); // Vérifie si la méthode est appelée
    this.DossierId = +this.route.snapshot.paramMap.get('id');
    console.log('ID du dossier récupéré :', this.DossierId);
  
    if (this.DossierId !== null) {
      this.loadUpdates();
    } else {
      console.error('ID non trouvé dans l\'URL');
    }
  }

  loadUpdates(): void {
    console.log('ID dans loadUpdates:', this.DossierId);
    if (this.DossierId !== null) {
      this.dossierUpdateService.getAllUpdates(this.DossierId).subscribe(
        (data) => {
          console.log('Mises à jour récupérées :', data);
          this.updates = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des mises à jour :', error);
        }
      );
    }
  }


  // Créer une nouvelle mise à jour
  createUpdate(): void {
    this.dossierUpdateService.createUpdate(this.dossierId, this.newUpdate).subscribe(
      (data) => {
        console.log('Mise à jour créée:', data);
        this.loadUpdates(); // Recharger les mises à jour après création
      },
      (error) => {
        console.error('Erreur lors de la création de la mise à jour :', error);
      }
    );
  }

  // Sélectionner une mise à jour pour l'affichage ou la modification
  selectUpdate(update: DossierJuridiqueUpdate): void {
    this.selectedUpdate = update;
  }

  // Mettre à jour une mise à jour existante
  updateUpdate(): void {
    if (this.selectedUpdate) {
      this.dossierUpdateService.updateDossierUpdate(this.selectedUpdate.id, this.selectedUpdate).subscribe(
        (data) => {
          console.log('Mise à jour modifiée:', data);
          this.loadUpdates(); // Recharger les mises à jour après modification
          this.selectedUpdate = null; // Désélectionner l'élément
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la mise à jour :', error);
        }
      );
    }
  }

  // Supprimer une mise à jour
  deleteUpdate(id: number): void {
    this.dossierUpdateService.deleteDossierUpdate(id).subscribe(
      () => {
        console.log('Mise à jour supprimée');
        this.loadUpdates(); // Recharger les mises à jour après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la mise à jour :', error);
      }
    );
  }

}