import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DossierJuridique } from 'src/app/Models/DossierJuridique';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';
import { DossierJuridiqueService } from 'src/app/service/DossierJuridiques/dossier-juridique.service';

@Component({
  selector: 'app-listedossier-avocat',
  templateUrl: './listedossier-avocat.component.html',
  styleUrls: ['./listedossier-avocat.component.css', ]
})
export class ListedossierAvocatComponent implements OnInit {
  sortAsc: boolean = true; // Pour alterner ascendant / descendant

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
  successMessage: string = '';
  errorMessage: string = '';
  

  codeAcces: string = '';
 
  modalVisible: boolean = false;
  cabinetId: number;
  isAddModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  isArchiveModalOpen: boolean = false;
  resultatRechercher: DossierJuridique;
  avocatId: number;
  CabinetId: void;
  constructor(private toastr: ToastrService ,private route: ActivatedRoute,private dossierService: DossierJuridiqueService,private avocatService :AvocatService) {}

  ngOnInit(): void {
   
      // Récupérer l'ID de l'avocat depuis le local storage
      this.avocatId = Number(localStorage.getItem('id'));
     console.log('ID de l\'avocat :', this.avocatId);

    //  this.cabinetId = +this.route.snapshot.paramMap.get('id');
      //console.log('ID du cabinet :', this.cabinetId);
      this.getAllDossiers();
      this.CabinetId==this.getCabinetIdByAvocat( this.avocatId);
      console.log('ID du cabinet :', this.CabinetId);
    }
    

  
  getAllDossiers(): void {
    this.dossierService.getAllDossiers().subscribe(
      (data) => {
        // Filtrer les dossiers en fonction de l'ID du cabinet
        this.dossiers = data.filter(dossier => dossier.avocat.id ===  this.avocatId ||  dossier.avocat ===  this.avocatId );
        console.log('Dossiers:', this.dossiers);
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des dossiers.';
      }
    );
  }
  sortByDateCreation() {
    this.dossiers.sort((a, b) => {
      const dateA = new Date(a.dateCreation || '');
      const dateB = new Date(b.dateCreation || '');
  
      return this.sortAsc ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  
    this.sortAsc = !this.sortAsc;
  }
  getCabinetIdByAvocat(avocatId: number): void {
    this.avocatService.getAvocatById(avocatId).subscribe(
      (avocat) => {
        if (avocat.cabinet) {
          this.cabinetId = avocat.cabinet.id; // Stocke l'ID du cabinet
          console.log('ID du cabinet de l\'avocat :', this.cabinetId);
        } else {
          console.log('Cet avocat n\'est pas associé à un cabinet.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du cabinet :', error);
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
      dossier.reference.toLowerCase().includes(this.codeAcces.toLowerCase()) && (dossier.avocat.id === this.avocatId || dossier.avocat === this.avocatId)

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
    if (!this.avocatId || !this.cabinetId) {
      console.error('Impossible de créer un dossier sans ID d\'avocat ou de cabinet.');
      this.errorMessage = 'Veuillez fournir un ID d\'avocat et un ID de cabinet.';
      this.successMessage = ''; // Vider le message de succès

      return;
    }

    this.newDossier.cabinet.id = this.cabinetId; // Assigner l'ID du cabinet
    this.newDossier.avocat.id = this.avocatId; // Assigner l'ID de l'avocat

    this.dossierService.createDossier(this.newDossier).subscribe(
      (response) => {
        console.log('Dossier ajouté avec succès:', response);
        this.toastr.success('Dossier ajouté avec succès! 🎉');
        // Afficher un message de succès
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
          cabinet: { id: this.cabinetId }, // Réassigner l'ID du cabinet après réinitialisation
          avocat: { id: this.avocatId },   // Réassigner l'ID de l'avocat après réinitialisation
          client: { email: '' }
        };

        // Fermer le modal d'ajout si nécessaire
        this.closeAddModal();
 this.getAllDossiers();
        // Effacer le message de succès après quelques secondes
        setTimeout(() => this.successMessage = '', 3000);
      },
      (error) => {
        this.toastr.error('Erreur lors de l’ajout du dossier:', error);
        // Afficher un message d'erreur
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

        this.successMessage = ''; // Vider le message de succès
        return;
      }

      this.dossierService.updateDossier(this.selectedDossier.id, this.selectedDossier).subscribe(
        (data) => {
          console.log('Dossier mis à jour:', data);
          this.successMessage = 'Dossier mis à jour avec succès!';
          this.toastr.success('Dossier mis à jour avec succès! 🎉');
          this.errorMessage = ''; // Vider le message d'erreur
          this.closeModal();
          this.getAllDossiers(); // Recharger les dossiers après la mise à jour

          // Effacer le message après quelques secondes
          setTimeout(() => this.successMessage = '', 3000);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.toastr.error('Erreur lors de la mise à jour du dossier.', error);
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
