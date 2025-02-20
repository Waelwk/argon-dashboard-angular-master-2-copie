import { Component, OnInit } from '@angular/core';
import { Manager } from 'src/app/Models/manager';
import { ManagerService } from 'src/app/service/user/manager.service';

@Component({
  selector: 'app-manager-crud',
  templateUrl: './manager-crud.component.html',
  styleUrls: ['./manager-crud.component.css'],
})
export class ManagerCrudComponent implements OnInit {
  managers: Manager[] = [];
  newManager: any = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'MANAGER',
    cabinet: {
      nom: '',
      adresse: '',
      numTel: '',
      email: '',
    },
  };

  selectedManager: Manager | null = null;
  isAddModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  isArchiveModalOpen: boolean = false; // Nouvelle variable pour la modale d'archivage
  managerToDeleteId: number | null = null;
  managerToArchiveId: number | null = null; // Nouvelle variable pour stocker l'ID du manager à archiver

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.loadManagers();
  }

  // Charger tous les managers
  loadManagers(): void {
    this.managerService.getAllUsers().subscribe(
      (data) => {
        this.managers = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des managers:', error);
      }
    );
  }

  // Ouvrir la modale d'archivage
  openArchiveModal(managerId: number): void {
    this.managerToArchiveId = managerId;
    this.isArchiveModalOpen = true;
  }

  // Confirmer l'archivage
  confirmArchive(): void {
    if (this.managerToArchiveId) {
      this.managerService.archiveUser(this.managerToArchiveId).subscribe(
        (response) => {
          console.log('Manager archivé avec succès:', response);
          this.loadManagers(); // Recharger la liste des managers
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de l\'archivage du manager:', error);
        }
      );
    }
  }

  // Fermer toutes les modales
  closeModal(): void {
    this.isAddModalOpen = false;
    this.isUpdateModalOpen = false;
    this.isDeleteModalOpen = false;
    this.isArchiveModalOpen = false; // Fermer la modale d'archivage
    this.selectedManager = null;
    this.managerToDeleteId = null;
    this.managerToArchiveId = null;
  }

  // Autres méthodes existantes
  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  addManager(): void {
    this.managerService.registerManager(this.newManager).subscribe(
      (response) => {
        console.log('Manager ajouté avec succès:', response);
        this.loadManagers();
        this.closeModal();
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du manager:', error);
      }
    );
  }

  openUpdateModal(manager: Manager): void {
    this.selectedManager = { ...manager };
    this.isUpdateModalOpen = true;
  }

  updateManager(): void {
    if (this.selectedManager) {
      this.managerService.updateUser(this.selectedManager.id, this.selectedManager).subscribe(
        (response) => {
          console.log('Manager mis à jour avec succès:', response);
          this.loadManagers();
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du manager:', error);
        }
      );
    }
  }

  openDeleteModal(managerId: number): void {
    this.managerToDeleteId = managerId;
    this.isDeleteModalOpen = true;
  }

  deleteManager(): void {
  
  }

  resetForm(): void {
    this.newManager = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: 'MANAGER',
      cabinet: {
        nom: '',
        adresse: '',
        numTel: '',
        email: '',
      },
    };
  }
}