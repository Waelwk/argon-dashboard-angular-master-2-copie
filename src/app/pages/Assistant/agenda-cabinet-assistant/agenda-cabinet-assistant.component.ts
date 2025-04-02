import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToastrService } from 'ngx-toastr';
import { RendezVous } from 'src/app/Models/RendezVous';
import { StatutRendezVous } from 'src/app/Models/StatutRendezVous';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
import { RendezVousService } from 'src/app/service/RendezVous/rendezvous.service';

@Component({
  selector: 'app-agenda-cabinet-assistant',
  templateUrl: './agenda-cabinet-assistant.component.html',
  styleUrls: ['./agenda-cabinet-assistant.component.css']
})
export class AgendaCabinetAssistantComponent implements OnInit {

 
  newRendezVous: RendezVous = { id: 0, motif: '', dateHeure: new Date(), statut: StatutRendezVous.ACCEPTE, demandeParClient: false, avocat: { id: 0 } }; // Nouveau rendez-vous
  rendezVousForm: RendezVous = { id: 0, motif: '', dateHeure: new Date(),  statut: StatutRendezVous.EN_ATTENTE, demandeParClient: false,  avocat: { id: 0 } }; // Formulaire pour le rendez-vous
  isRendezVousModalOpen = false; // Contrôle l'ouverture du modal
  isEditMode = false; // Contrôle si on est en mode ajout ou modification

  rendezVousList: RendezVous[] = []; // Liste des rendez-vous récupérés

 

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    events: [],  // Initialise avec un tableau vide
    dateClick: this.onDateClick.bind(this),
    eventClick: this.onEventClick.bind(this)
  };
  AsisstantID: number;
  isLoading: boolean;

  assistant: any;
  cabinetId: number;
  error: string;

  constructor(private assistantService:AssistantService,private toastr: ToastrService,private rendezVousService: RendezVousService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {


    this.AsisstantID= Number(localStorage.getItem('id'));
    console.log('is', this.AsisstantID)

  


    if (this.AsisstantID) {
      this.getAssistant(this.AsisstantID);
      console.log('', this.getAssistant(this.AsisstantID));
    }
  }

  getAssistant(assistantId: number): void {
    this.isLoading = true;
    this.assistantService.getAssistantById(assistantId).subscribe({
      next: (data) => {
        this.assistant = data;
        console.warn('Assistant reçu:', this.assistant);
  
        // Vérifie si l'objet assistant et cabinet existent dans la réponse
        if (this.assistant && this.assistant.cabinet) {
          this.cabinetId = this.assistant.cabinet.id;
          console.log('ID du cabinet:', this.cabinetId);
          this.getRendezVousByCabinet(this.cabinetId); 
        } else {
          console.warn('Aucun cabinet associé à cet assistant');
        }
  
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Échec du chargement des détails de l\'assistant';
        this.isLoading = false;
        console.error('Erreur:', err);
      }
    });
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
    this.rendezVousService.getRendezVousByCabinet(id).subscribe(
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
  getRendezVousByCabinet(cabinetId: number): void {
    this.rendezVousService.getRendezVousByCabinet(this.cabinetId).subscribe(

      (data: RendezVous[]) => {
        console.log('daate',data)
        this.rendezVousList = data;
        this.updateCalendar();
      },
      (error) => {
        console.error('Erreur lors du chargement des rendez-vous', error);
      }
    );
  }
  

}
