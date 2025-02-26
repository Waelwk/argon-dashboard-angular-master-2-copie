import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cabinet } from 'src/app/Models/cabinet';
import { Role } from 'src/app/Models/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CabinetService } from 'src/app/service/cabinet/cabinet.service';

@Component({
  selector: 'app-cabinets',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {
  cabinets: Cabinet[] = [];
  isAddModalOpen = false;
  isUpdateModalOpen = false;
  isDeleteModalOpen = false;
  isArchiveModalOpen = false;
  selectedCabinet: Cabinet | null = null;
  newCabinet: Cabinet = {
    id: 0,
    nom: '',
    adresse: '',
    numTel: '',
    emailC: '',
    dateCreation: '',
    manager: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      cabinet: undefined,
      role: Role.MANAGER,
      enabled: false,
      archivee: false
    }
  };

  constructor(private router: Router,private cabinetService: CabinetService, private authService:AuthService) {}


  voirInformationsCabinet(cabinetId: number) {
    this.router.navigate(['/dashboard/cabinetinfo', cabinetId]);
    console.log(cabinetId);
  }
  ngOnInit(): void {
    this.loadCabinets();
  }

  // Charger tous les cabinets
  loadCabinets(): void {
    this.cabinetService.getAllCabinets().subscribe({
      next: (data) => {
        this.cabinets = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des cabinets :', err);
      }
    });
  }

  // Ouvrir les modales
  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  openUpdateModal(cabinet: Cabinet): void {
    this.selectedCabinet = { ...cabinet }; // Ensure the cabinet data is copied
    this.isUpdateModalOpen = true;
  }

  openDeleteModal(cabinet: Cabinet): void {
    this.selectedCabinet = cabinet;
    this.isDeleteModalOpen = true;
  }

  openArchiveModal(cabinet: Cabinet): void {
    this.selectedCabinet = cabinet;
    this.isArchiveModalOpen = true;
  }

  // Fermer toutes les modales
  closeModal(): void {
    this.isAddModalOpen = false;
    this.isUpdateModalOpen = false;
    this.isDeleteModalOpen = false;
    this.isArchiveModalOpen = false;
    this.selectedCabinet = null;
  }

  // Ajouter un cabinet avec manager
  addCabinet(): void {
    const cabinetData = {
      firstname: this.newCabinet.manager.firstname,
      lastname: this.newCabinet.manager.lastname,
      email: this.newCabinet.manager.email,
      password: this.newCabinet.manager.password,
      nomCabinet: this.newCabinet.nom,
      adresse: this.newCabinet.adresse,
      numTel: this.newCabinet.numTel,
      emailC:this.newCabinet.emailC ,
    };

    console.log("📢 Données envoyées à l'API :", cabinetData);

    this.authService.registerCabinet(cabinetData).subscribe({
      next: () => {
        this.loadCabinets();
        this.closeModal();
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du cabinet :", err);
      }
    });
  }

  // Mettre à jour un cabinet
  onUpdateCabinet(): void {
    if (this.selectedCabinet) {
      this.cabinetService.updateCabinet(this.selectedCabinet.id, this.selectedCabinet).subscribe({
        next: (updatedCabinet) => {
          console.log('Cabinet updated successfully:', updatedCabinet);
          this.loadCabinets(); // Reload the cabinets list after update
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating cabinet:', err);
        }
      });
    }
  }

  // Supprimer un cabinet
  deleteCabinet(): void {
    if (!this.selectedCabinet) return;

    if (confirm("Êtes-vous sûr de vouloir supprimer ce cabinet ?")) {
      this.cabinetService.deleteCabinet(this.selectedCabinet.id).subscribe({
        next: () => {
          this.loadCabinets();
          this.closeModal();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression :", err);
        }
      });
    }
  }

  // Archiver un cabinet
  archiveCabinet(): void {
    // Implémenter la logique d'archivage si nécessaire
  }
}
