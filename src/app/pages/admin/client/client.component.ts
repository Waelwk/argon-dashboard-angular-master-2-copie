import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/client';
import { ClientService } from 'src/app/service/client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  archivedClients: Client[] = [];
  isAddClientModalOpen = false;

  newClient: Client = {
    id: 0, // Ajout de l'ID
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    adresse: '',
    archivee: false
  };
  

  selectedClient: Client | null = null;
  isAddModalOpen = false;
  isUpdateModalOpen = false;
  isDeleteModalOpen = false;
  isArchiveModalOpen = false;
  
  clientToDeleteId: number | null = null;
  clientToArchiveId: number | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadArchivedClients();
  }
  openAddClientModal() {
    this.isAddClientModalOpen = true;
}


addClient() {
    this.clientService.Create(this.newClient).subscribe(
        (response) => {
            console.log('Client ajouté avec succès', response);
            this.clients.push(response); // Mettre à jour la liste localement
            this.closeModal();
        },
        (error) => {
            console.error('Erreur lors de l\'ajout du client', error);
        }
    );
}

  // Charger les clients actifs
  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data.filter(client => !client.archivee);
      },
      (error) => {
        console.error('Erreur lors du chargement des clients:', error);
      }
    );
  }

  loadArchivedClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        console.log('Données brutes de l\'API:', data); // Étape 1: Vérifiez les données reçues
        
        if (data && Array.isArray(data)) {
          this.archivedClients = data.filter(client => client.archivee === true);
          console.log('Clients archivés filtrés:', this.archivedClients); // Étape 2: Vérifiez le filtre
        } else {
          console.warn('Aucune donnée ou format invalide:', data);
        }
      },
      (error) => {
        console.error('Erreur API:', error); // Étape 3: Vérifiez les erreurs
      }
    );
  }

  // Ouvrir la modale d'ajout
  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  // Ajouter un client


  // Ouvrir la modale de mise à jour
 
  // Mettre à jour un client
  updateClient(): void {
    if (this.selectedClient && this.selectedClient.id) {
      this.clientService.updateClient(this.selectedClient.id, this.selectedClient).subscribe(
        () => {
          console.log('Client mis à jour avec succès');
          this.loadClients();
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du client:', error);
        }
      );
    } else {
      console.error("Erreur : Client invalide ou ID manquant.");
    }
  }
  

  openUpdateModal(client: Client): void {
    if (client) {
      console.log('Ouverture du modal de mise à jour pour :', client); // Vérification en console
      this.selectedClient = { ...client }; // Copie des données
      this.isUpdateModalOpen = true;
    } else {
      console.error("Erreur : Client invalide");
    }
  }
  
  
  openArchiveModal(clientId: number): void {
    console.log('Ouverture du modal d\'archivage pour ID:', clientId);
    this.clientToArchiveId = clientId;
    this.isArchiveModalOpen = true;
  }
  

  // Confirmer l'archivage
  confirmArchive(): void {
    if (this.clientToArchiveId !== null) {
      this.clientService.archiveClient(this.clientToArchiveId).subscribe(
        () => {
          console.log('Client archivé avec succès');
          this.loadClients();
          this.loadArchivedClients();
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de l\'archivage du client:', error);
        }
      );
    } else {
      console.error("Erreur : ID du client à archiver non défini.");
    }
  }
  

  // Ouvrir la modale de suppression
  openDeleteModal(clientId: number): void {
    this.clientToDeleteId = clientId;
    this.isDeleteModalOpen = true;
  }

  // Supprimer un client (si nécessaire)
  deleteClient(): void {
    if (this.clientToDeleteId) {
      this.clientService.deleteClient(this.clientToDeleteId).subscribe(
        (response) => {
          console.log('Client supprimé avec succès:', response);
          this.loadClients();
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de la suppression du client:', error);
        }
      );
    }
  }

  // Fermer toutes les modales
  closeModal(): void {
    this.isAddModalOpen = false;
    this.isUpdateModalOpen = false;
    this.isDeleteModalOpen = false;
    this.isArchiveModalOpen = false;
    this.selectedClient = null;
    this.clientToDeleteId = null;
    this.clientToArchiveId = null;
    this.isAddClientModalOpen = false;
    this.isUpdateModalOpen = false;
    this.isArchiveModalOpen = false;
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.newClient = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      adresse: '',
 
    };
  }
}