import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DossierJuridique } from 'src/app/Models/ DossierJuridique';
import { Assistant } from 'src/app/Models/assistant';


import { DossierJuridiqueService } from 'src/app/service/DossierJuridiques/dossier-juridique.service';
@Component({
  selector: 'app-listedossier-m',
  templateUrl: './listedossier-m.component.html',
  styleUrls: ['./listedossier-m.component.css']
})
export class ListedossierMComponent implements OnInit {
 dossiers: DossierJuridique[] = [];
  selectedDossier?: DossierJuridique;
  resultatRecherche: any = null;
  newDossier: DossierJuridique = {
    reference: '',
    titre: '',
    description: '',
    type: '',
    statut: '',
    priorite: '',
    categorie: '',
    cabinet: { id: 0 },
    avocat: { id: 0 },
    client: { email: '' },
    id: 0
  };


  codeAcces: string = '';
  errorMessage: string = '';
  modalVisible: boolean = false;
  cabinetId: number;
  isAddModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  isArchiveModalOpen: boolean = false;
  resultatRechercher: DossierJuridique;
  constructor(private route: ActivatedRoute,private dossierService: DossierJuridiqueService) {}

  ngOnInit(): void {
    this.cabinetId = +this.route.snapshot.paramMap.get('id');
    console.log('ID du cabinet :', this.cabinetId);
    this.getAllDossiers();
  }
  
  getAllDossiers(): void {
    this.dossierService.getAllDossiers().subscribe(
      (data) => {
        // Filtrer les dossiers en fonction de l'ID du cabinet
        this.dossiers = data.filter(dossier => dossier.cabinet.id === this.cabinetId);
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des dossiers.';
      }
    );
  }
  
  consulterDossier(): void {
    if (!this.codeAcces.trim()) {
      this.errorMessage = 'Veuillez entrer un code d\'accès ou une référence valide';
      return;
    }
  
    // Effectuer le filtrage local
    const filteredDossier = this.dossiers.filter(dossier => 
      dossier.codeAcces.toLowerCase().includes(this.codeAcces.toLowerCase()) || 
      dossier.reference.toLowerCase().includes(this.codeAcces.toLowerCase())
    );
  
    if (filteredDossier.length > 0) {
      this.resultatRechercher = filteredDossier[0];  // On prend le premier dossier trouvé
      console.log('Résultat de la recherche:', this.resultatRechercher);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Aucun dossier trouvé avec ce code d\'accès ou cette référence';
    }
  }
  
  addDossier() {
    this.dossierService.createDossier(this.newDossier).subscribe(response => {
      console.log('Dossier ajouté avec succès:', response);
      
      // Réinitialisation du formulaire après l'ajout
      this.newDossier = {
        reference: '',
        titre: '',
        description: '',
        type: '',
        statut: '',
        priorite: '',
        categorie: '',
        cabinet: { id: 0 },
        avocat: { id: 0 },
        client: { email: '' }
      };
    }, error => {
      console.error('Erreur lors de l’ajout du dossier:', error);
    });
  }
  
  openModal(dossier: DossierJuridique): void {
    this.selectedDossier = { ...dossier }; // Crée une copie du dossier
    this.modalVisible = true;
    this.isUpdateModalOpen = true;
  }
  openAddModal() {
    this.isAddModalOpen = true;
  }

  // Fermer le modal d'ajout
  closeAddModal() {
    this.isAddModalOpen = false;
  }
  closeModal(): void {
    this.isUpdateModalOpen = false;
    this.isAddModalOpen = false;
    this.isArchiveModalOpen = false;
    this.modalVisible = false;
  }

  updateDossier(): void {
    if (this.selectedDossier) {
      console.log('Dossier à mettre à jour:', this.selectedDossier);

      if (!this.selectedDossier.id) {
        this.errorMessage = 'ID du dossier manquant!';
        return;
      }

      this.dossierService.updateDossier(this.selectedDossier.id, this.selectedDossier).subscribe(
        (data) => {
          console.log('Dossier mis à jour:', data);
          this.errorMessage = '';
          this.closeModal();
          this.getAllDossiers(); // Recharger les dossiers après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.errorMessage = 'Erreur lors de la mise à jour du dossier.';
        }
      );
    } else {
      this.errorMessage = 'Veuillez sélectionner un dossier à mettre à jour.';
    }
  }
  
}
