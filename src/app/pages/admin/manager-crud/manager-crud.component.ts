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

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    
    this.loadManagers();
  }

  // Récupérer tous les managers
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

  // Ajouter un manager
  addManager(): void {
    this.managerService.registerManager(this.newManager).subscribe(
      (response) => {
        console.log('Manager ajouté avec succès:', response);
        this.loadManagers(); // Recharger la liste
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du manager:', error);
      }
    );
  }

  // Mettre à jour un manager
  updateManager(userId: number): void {
    const updatedData = {
      firstname: 'Nouvel prénom',
      lastname: 'Nouveau nom',
    };
    this.managerService.updateUser(userId, updatedData).subscribe(
      (response) => {
        console.log('Manager mis à jour avec succès:', response);
        this.loadManagers(); // Recharger la liste
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du manager:', error);
      }
    );
  }
}
