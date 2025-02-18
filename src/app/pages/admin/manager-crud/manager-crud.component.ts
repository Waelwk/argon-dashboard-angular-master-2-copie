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
  managerToDeleteId: number | null = null;

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

  // Ouvrir la modale d'ajout
  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  // Ajouter un manager
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

  // Ouvrir la modale de mise à jour
  openUpdateModal(manager: Manager): void {
    this.selectedManager = { ...manager };
    this.isUpdateModalOpen = true;
  }

  // Mettre à jour un manager
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

  // Ouvrir la modale de suppression
  openDeleteModal(managerId: number): void {
    this.managerToDeleteId = managerId;
    this.isDeleteModalOpen = true;
  }

  // Supprimer un manager
  deleteManager(): void {
   
  }

  // Fermer toutes les modales
  closeModal(): void {
    this.isAddModalOpen = false;
    this.isUpdateModalOpen = false;
    this.isDeleteModalOpen = false;
    this.selectedManager = null;
    this.managerToDeleteId = null;
  }

  // Réinitialiser le formulaire d'ajout
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