import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/Models/client';
import { ClientService } from 'src/app/service/client/client.service';

@Component({
  selector: 'app-edit-profil-client',
  templateUrl: './edit-profil-client.component.html',
  styleUrls: ['./edit-profil-client.component.css']
})
export class EditProfilClientComponent implements OnInit {
  
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;
  client: Client  // Declare the client property
  id: string;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
 
  const clientId = localStorage.getItem('id');
    if (clientId) {
      this.clientService.getClientById(308).subscribe(
        (data: Client) => {
          this.client = data;
          this.client.password = ''; 
          console.log('Données du client récupérées:', this.client);  // Affichage des données dans la console
        },
        (error) => {
          console.error('Erreur lors de la récupération du client', error);
          this.toastr.error('Erreur lors de la récupération du client');
        }
      );
    }
  }
  

  
  

  updateClient(): void {
    // Vérification si les mots de passe correspondent
    if (this.client && this.client.password !== this.confirmPassword) {
      this.toastr.error('Les mots de passe ne correspondent pas');
      return;
    }

    // Créer une copie de client pour envoyer la mise à jour
    const updatedClient = { ...this.client };

    // Ne pas envoyer le champ password s’il est vide
    if (!updatedClient.password || updatedClient.password.trim() === '') {
      delete updatedClient.password;
    }

    this.clientService.updateClient(this.client.id, updatedClient).subscribe(
      () => {
        this.toastr.success('Client mis à jour avec succès');
      },
      (error) => {
        this.toastr.error('Erreur lors de la mise à jour du client');
      }
    );
  }}