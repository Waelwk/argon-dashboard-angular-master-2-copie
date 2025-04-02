import { Component, OnInit } from "@angular/core";

import { AccessCode } from "src/app/Models/AccessCode";
import { RendezVous } from "src/app/Models/RendezVous";
import { StatutRendezVous } from "src/app/Models/StatutRendezVous";

import { RendezVousService } from "src/app/service/RendezVous/rendezvous.service";
import { ToastrService } from "ngx-toastr";
import { DossierJuridique } from "src/app/Models/ DossierJuridique";
import { AccessCodeService } from "src/app/service/access-code /access-code.service";
import { co } from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-liste-dossier-client',
  templateUrl: './liste-dossier-client.component.html',
  styleUrls: ['./liste-dossier-client.component.css']
})
export class ListeDossierClientComponent implements OnInit {
  isModalOpen: boolean = false; // Contrôle l'affichage du modal
  codes: AccessCode[] = [];
  dossiers: DossierJuridique[] = [];
  loading = false;
  error: string | null = null;
  nouveauCode: string = '';
  message: string = '';
  ClientId: number = Number(localStorage.getItem('id'));
  
  rendezVousForm: RendezVous = {
    id: 0,
    motif: '',
    dateHeure: new Date(),
    statut: StatutRendezVous.EN_ATTENTE,
    demandeParClient: true,
    avocat: { id: 0 },
    client: { id: this.ClientId }
  };
  
  isRendezVousModalOpen = false;
  isEditMode = false;

  constructor(
    private toastr: ToastrService,
    private accessCodeService: AccessCodeService,
    private rendezVousService: RendezVousService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  
  openAddRendezVousModal(dossier: DossierJuridique) {
    this.isEditMode = false;
    this.rendezVousForm = {
      id: 0,
      motif: '',
      dateHeure: new Date(),
      statut: StatutRendezVous.EN_ATTENTE,
      demandeParClient: false,
      avocat: dossier.avocat ? { id: dossier.avocat.id } : { id: 0 },
      client: { id: this.ClientId }
    };
    
    if (!dossier.avocat) {
      this.toastr.warning("Aucun avocat associé à ce dossier.");
    }
    
    this.isRendezVousModalOpen = true;
  }

  closeRendezVousModal() {
    this.isRendezVousModalOpen = false;
  }
  createRendezVous(): void {
    if (!this.rendezVousForm.motif || !this.rendezVousForm.dateHeure) {
      this.toastr.error("Veuillez remplir tous les champs du rendez-vous.");
      return;
    }

    if (!this.rendezVousForm.avocat.id) {
      this.toastr.error("Aucun avocat n'est sélectionné.");
      return;
    }

    // Vérifier que ClientId est bien défini avant d'envoyer
    if (!this.rendezVousForm.client || !this.rendezVousForm.client.id) {
      this.toastr.error("Erreur : Aucun ID de client détecté.");
      console.error("Client ID manquant !", this.rendezVousForm);
      return;
    }

    console.log("Données envoyées à l'API :", JSON.stringify(this.rendezVousForm, null, 2));

    this.rendezVousService.demanderRendezVous(this.rendezVousForm).subscribe(
      (response) => {
        this.toastr.success('Rendez-vous ajouté avec succès');
        console.log("Réponse du serveur :", response);
        this.closeRendezVousModal();
      },
      (error) => {
        this.toastr.error('Erreur lors de l’ajout du rendez-vous');
        console.error("Erreur complète :", error);
      }
    );
}


  ajouterCode(): void {
    if (!this.nouveauCode.trim()) {
      this.toastr.warning('Veuillez saisir un code valide.');
      return;
    }

    this.accessCodeService.addAccessCode(this.ClientId, this.nouveauCode).subscribe({
      next: (response) => {
        this.message = `Code ajouté : ${response.code}`;
        this.nouveauCode = '';
        this.loadData();
      },
      error: (response) => {
        this.error = response.error?.error || 'Erreur lors de lajout du code ou code existe.';
      }
    });
  }
  
  loadData(): void {
    this.loading = true;
    this.error = null;
    this.codes = [];
    this.dossiers = [];

    this.accessCodeService.getCompleteData(this.ClientId).subscribe({
      next: ({ codes, dossiers }) => {
        this.codes = codes;
        this.dossiers = dossiers;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur lors du chargement des données:', err);
      }
    });
  } 
}
