import { Component, OnInit } from '@angular/core';
import { DossierJuridique } from 'src/app/Models/DossierJuridique';

import { DossierJuridiqueService } from 'src/app/service/DossierJuridiques/dossier-juridique.service';

@Component({
  selector: 'app-dossier-juridique',
  templateUrl: './dossier-juridique.component.html',
  styleUrls: ['./dossier-juridique.component.css']
})
export class DossierJuridiqueComponent implements OnInit {
  dossiers: DossierJuridique[] = [];
  selectedDossier?: DossierJuridique;
    nbTotalDossiers: number = 0;

dossierE : DossierJuridique[] = [];
  nbDossiersEnCours: number = 0;
  nbDossiersClotures: number = 0;
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
  successMessage: string = ''; // Message de succès ajouté
  modalVisible: boolean = false;

  isAddModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  isArchiveModalOpen: boolean = false;
  resultatRechercher: DossierJuridique;

  constructor(private dossierService: DossierJuridiqueService) {}

  ngOnInit(): void {
    this.getAllDossiers();
  }

  getAllDossiers(): void {
    this.dossierService.getAllDossiers().subscribe(
      (data) => {
        this.dossiers = data;
            this.nbTotalDossiers = this.dossiers.length;
          this.dossierE = this.dossiers.filter(d => d.statut === 'En cours');
          this.nbDossiersEnCours = this.dossiers.filter(d => d.statut === 'En cours').length;
          this.nbDossiersClotures = this.dossiers.filter(d => d.statut === 'Clôturé').length;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des dossiers.';
        this.successMessage = ''; // Vider les messages de succès en cas d'erreur
      }
    );
  }

  consulterDossier(): void {
    if (!this.codeAcces.trim()) {
      this.errorMessage = 'Veuillez entrer un code d\'accès ou une référence valide';
      this.successMessage = ''; // Vider les messages de succès
      return;
    }
  
    const filteredDossier = this.dossiers.filter(dossier => 
      dossier.codeAcces.toLowerCase().includes(this.codeAcces.toLowerCase()) || 
      dossier.reference.toLowerCase().includes(this.codeAcces.toLowerCase())
    );
  
    if (filteredDossier.length > 0) {
      this.resultatRechercher = filteredDossier[0];  // On prend le premier dossier trouvé
      console.log('Résultat de la recherche:', this.resultatRechercher);
      this.errorMessage = '';
      this.successMessage = ''; // Vider le message de succès
    } else {
      this.errorMessage = 'Aucun dossier trouvé avec ce code d\'accès ou cette référence';
      this.successMessage = ''; // Vider les messages de succès
    }
  }

  addDossier() {
    this.dossierService.createDossier(this.newDossier).subscribe(
      (response) => {
        console.log('Dossier ajouté avec succès:', response);

        // Affichage du message de succès
        this.successMessage = 'Dossier ajouté avec succès!';
        this.errorMessage = ''; // Vider le message d'erreur

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

        // Fermer le modal d'ajout si nécessaire
        this.closeAddModal();
        
        // Effacer le message de succès après quelques secondes
        setTimeout(() => this.successMessage = '', 3000);
      },
      (error) => {
        console.error('Erreur lors de l’ajout du dossier:', error);
        this.errorMessage = 'Erreur lors de l\'ajout du dossier.';
        this.successMessage = ''; // Vider le message de succès
      }
    );
  }

  openModal(dossier: DossierJuridique): void {
    this.selectedDossier = { ...dossier }; // Crée une copie du dossier
    this.modalVisible = true;
    this.isUpdateModalOpen = true;
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

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
        this.successMessage = ''; // Vider le message de succès
        return;
      }

      this.dossierService.updateDossier(this.selectedDossier.id, this.selectedDossier).subscribe(
        (data) => {
          console.log('Dossier mis à jour:', data);
          this.successMessage = 'Dossier mis à jour avec succès!'; // Affichage du message de succès
          this.errorMessage = ''; // Vider le message d'erreur
          this.closeModal();
          this.getAllDossiers(); // Recharger les dossiers après la mise à jour
          
          // Effacer le message de succès après quelques secondes
          setTimeout(() => this.successMessage = '', 3000);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.errorMessage = 'Erreur lors de la mise à jour du dossier.';
          this.successMessage = ''; // Vider le message de succès
        }
      );
    } else {
      this.errorMessage = 'Veuillez sélectionner un dossier à mettre à jour.';
      this.successMessage = ''; // Vider le message de succès
    }
  }
}
