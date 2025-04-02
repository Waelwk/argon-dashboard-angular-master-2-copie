import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/Models/client';
import { RendezVous } from 'src/app/Models/RendezVous';
import { StatutRendezVous } from 'src/app/Models/StatutRendezVous';
import { ClientService } from 'src/app/service/client/client.service';
import { RendezVousService } from 'src/app/service/RendezVous/rendezvous.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  newRendezVous: RendezVous = { id: 0, motif: '', dateHeure: new Date(), statut: StatutRendezVous.ACCEPTE, demandeParClient: false, avocat: { id: 0 } }; // Nouveau rendez-vous
  rendezVousForm: RendezVous = { id: 0, motif: '', dateHeure: new Date(),  statut: StatutRendezVous.EN_ATTENTE, demandeParClient: false,  avocat: { id: 0 } }; // Formulaire pour le rendez-vous
  isRendezVousModalOpen = false; // Contrôle l'ouverture du modal
  isEditMode = false; // Contrôle si on est en mode ajout ou modification

  rendezVousList: RendezVous[] = []; // Liste des rendez-vous récupérés

  avocatId: number;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    events: [],  // Initialise avec un tableau vide
    dateClick: this.onDateClick.bind(this),
    eventClick: this.onEventClick.bind(this)
  };
  clients: Client[] = [];

  constructor(private clientService :ClientService,private toastr: ToastrService,private rendezVousService: RendezVousService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.avocatId = Number(localStorage.getItem('id'));
    this.getRendezVous(); // Récupérer les rendez-vous de l'avocat
  }
  accepterRendezVous(id: number): void {
    this.rendezVousService.accepterRendezVous(id).subscribe(
      (data) => {
        // Mettre à jour l'état du rendez-vous dans la liste
        const index = this.rendezVousList.findIndex(rdv => rdv.id === id);
        if (index !== -1) {
          this.rendezVousList[index].statut = StatutRendezVous.ACCEPTE;
          this.updateCalendar();
          this.getRendezVous();
          this.toastr.success('Rendez-vous accepté avec succès');
        }
      },
      (error) => {
        this.toastr.success('Erreur lors de l\'acceptation du rendez-vous', error);
      }
    );
  }

  // Refuser un rendez-vous
  refuserRendezVous(id: number): void {
    this.rendezVousService.refuserRendezVous(id).subscribe(
      (data) => {
        // Mettre à jour l'état du rendez-vous dans la liste
        const index = this.rendezVousList.findIndex(rdv => rdv.id === id);
        if (index !== -1) {
          this.rendezVousList[index].statut = StatutRendezVous.REFUSE;
          this.updateCalendar();
          this.getRendezVous();
          this.toastr.success('Rendez-vous refusé avec succès');
        }
      },
      (error) => {
        this.toastr.success('Erreur lors du refus du rendez-vous', error);
      }
    );
  }
  // Ouvrir le modal pour ajouter un rendez-vous
  openAddRendezVousModal() {
    this.isEditMode = false;
    this.rendezVousForm = { id: 0, motif: '', dateHeure: new Date(),  statut: StatutRendezVous.ACCEPTE,demandeParClient: true }; // Réinitialiser le formulaire
    this.isRendezVousModalOpen = true;
  }



  // Ouvrir le modal pour modifier un rendez-vous
  openEditRendezVousModal(index: number) {
    this.rendezVousForm = { ...this.rendezVousList[index] };  // Pré-remplir avec les données du rendez-vous
    this.isEditMode = true;
    this.isRendezVousModalOpen = true;
  }

  // Fermer le modal
  closeRendezVousModal() {
    this.isRendezVousModalOpen = false;
  }

  // Sauvegarder ou mettre à jour un rendez-vous
  saveRendezVous() {
    if (this.isEditMode) {
      this.rendezVousService.updateRendezVous(this.rendezVousForm.id, this.rendezVousForm).subscribe(
        (data) => {
          const index = this.rendezVousList.findIndex(rdv => rdv.id === this.rendezVousForm.id);
          this.rendezVousList[index] = data;  // Mettre à jour le rendez-vous modifié
          this.updateCalendar();  // Mettre à jour le calendrier
          this.closeRendezVousModal();
          this.toastr.success('Rendez-vous mis à jour avec succès');
        },
        (error) => {
          this.toastr.success('Erreur lors de la mise à jour du rendez-vous', error);
        }
      );
    } else {
      this.createRendezVous();
    }
  }

  createRendezVous(): void {
    // Assurez-vous que les données sont valides
    if (this.rendezVousForm.motif && this.rendezVousForm.dateHeure) {
      this.rendezVousForm.avocat = { id: this.avocatId }
      console.log('ID de l\'avocat:',  this.newRendezVous.avocat);

      console.log(this.rendezVousForm);
      this.rendezVousService.createRendezVous(this.rendezVousForm).subscribe(
        (data) => {
          // Ajouter le rendez-vous créé à la liste existante
          this.rendezVousList.push(data);
          // Optionnellement, mettez à jour le calendrier si nécessaire
          this.updateCalendar(); 
          this.toastr.success('Rendez-vous ajouté avec succès');
          this.closeRendezVousModal(); // Fermer le modal après ajout
          
        },
        (error) => {
          this.toastr.success('Erreur lors de l\'ajout du rendez-vous', error);
        }
      );
    } else {
      console.error('Les informations du rendez-vous sont invalides');
    }
  }

  // Mettre à jour les événements du calendrier
  updateCalendar() {
    this.calendarOptions.events = this.rendezVousList.map(rdv => ({
      title: rdv.motif,
      start: rdv.dateHeure,  // Assurez-vous que ce champ est bien au format ISO
      id: rdv.id.toString()
    
    }));
    
    this.cdr.detectChanges();
  // Forcer la mise à jour du calendrier
  }

  // Gérer le clic sur une date
  onDateClick(info: any) {
    this.newRendezVous.dateHeure = info.dateStr;
  }

  // Gérer le clic sur un événement
  onEventClick(info: any) {
    if (confirm('Supprimer ce rendez-vous ?')) {
      this.deleteRendezVous(info.event.id);
    }
  }

  // Supprimer un rendez-vous
  deleteRendezVous(id: number) {
    this.rendezVousService.deleteRendezVous(id).subscribe(
      () => {
        this.rendezVousList = this.rendezVousList.filter(rdv => rdv.id !== id);
        this.updateCalendar();  // Mettre à jour les événements du calendrier
      },
      (error) => {
        this.toastr.success('Erreur lors de la suppression du rendez-vous', error);
      }
    );
  }

  // Récupérer les rendez-vous depuis l'API
  getRendezVous(): void {
    this.rendezVousService.getRendezVousByAvocat(this.avocatId).subscribe(
      (data: RendezVous[]) => {
        this.rendezVousList = data;
        console.log('Rendez-vous récupérés avec succès :', data);

        // Récupérer les informations des clients
        this.rendezVousList.forEach((rdv) => {
          if (rdv.client) {
            this.getClientById(rdv.client.id);
          }
        });

        this.updateCalendar();
      },
      (error) => {
        console.error('Erreur lors du chargement des rendez-vous', error);
      }
    );
  }

  getClientById(clientId: number): void {
    if (!this.clients[clientId]) { // Évite les appels API en double
      this.clientService.getClientById(clientId).subscribe(
        (client: Client) => {
          this.clients[clientId] = client;
          console.log(`Client ${clientId} récupéré avec succèss :`, client);
        },
        (error) => {
          console.error(`Erreur lors du chargement du client ${clientId}`, error);
        }
      );
    }
  }
}