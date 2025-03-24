import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RendezVous } from 'src/app/Models/RendezVous';
import { StatutRendezVous } from 'src/app/Models/StatutRendezVous';
import { RendezVousService } from 'src/app/service/RendezVous/rendezvous.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  newRendezVous: RendezVous = { id: 0, motif: '', dateHeure: new Date(), statut: StatutRendezVous.EN_ATTENTE, demandeParClient: true }; // Nouveau rendez-vous
  rendezVousForm: RendezVous = { id: 0, motif: '', dateHeure: new Date(),  statut: StatutRendezVous.EN_ATTENTE, demandeParClient: true }; // Formulaire pour le rendez-vous
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

  constructor(private rendezVousService: RendezVousService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.avocatId = Number(localStorage.getItem('id'));
    this.getRendezVous(); // Récupérer les rendez-vous de l'avocat
  }

  // Ouvrir le modal pour ajouter un rendez-vous
  openAddRendezVousModal() {
    this.isEditMode = false;
    this.rendezVousForm = { id: 0, motif: '', dateHeure: new Date(),  statut: StatutRendezVous.EN_ATTENTE,demandeParClient: true }; // Réinitialiser le formulaire
    this.isRendezVousModalOpen = true;
  }

  // Ajouter un rendez-vous
  addRendezVous() {
    if (this.newRendezVous.motif && this.newRendezVous.dateHeure) {
      // this.rendezVousService.addRendezVous(this.newRendezVous).subscribe(
      //   (data) => {
      //     this.rendezVousList.push(data);  // Ajouter le nouveau rendez-vous à la liste
      //     this.updateCalendar();  // Mettre à jour les événements du calendrier
      //     this.closeRendezVousModal();  // Fermer le modal après ajout
      //   },
      //   (error) => {
      //     console.error('Erreur lors de l\'ajout du rendez-vous', error);
      //   }
      // );
    }
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
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du rendez-vous', error);
        }
      );
    } else {
      this.addRendezVous();
    }
  }

  // Mettre à jour les événements du calendrier
  updateCalendar() {
    this.calendarOptions.events = this.rendezVousList.map(rdv => ({
      title: rdv.motif,
      start: rdv.dateHeure,  // Assurez-vous que ce champ est bien au format ISO
      id: rdv.id.toString()
    }));
    this.cdr.detectChanges();  // Forcer la mise à jour du calendrier
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
        console.error('Erreur lors de la suppression du rendez-vous', error);
      }
    );
  }

  // Récupérer les rendez-vous depuis l'API
  getRendezVous(): void {
    this.rendezVousService.getRendezVousByAvocat(this.avocatId).subscribe(
      (data: RendezVous[]) => {
        this.rendezVousList = data;
        this.updateCalendar();
      },
      (error) => {
        console.error('Erreur lors du chargement des rendez-vous', error);
      }
    );
  }
}
