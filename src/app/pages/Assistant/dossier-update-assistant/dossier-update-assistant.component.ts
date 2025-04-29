import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DossierJuridiqueUpdate } from 'src/app/Models/DossierJuridiqueUpdate';
import { RendezVous } from 'src/app/Models/RendezVous';
import { DossierJuridiqueUpdateService } from 'src/app/service/Dossier_juridique_update/dossier-juridique-update.service';
import { DossierJuridiqueService } from 'src/app/service/DossierJuridiques/dossier-juridique.service';
import * as QRCode from 'qrcode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { DocumentService } from 'src/app/service/Document/document.service';
import { DossierJuridique } from 'src/app/Models/DossierJuridique';



@Component({
  selector: 'app-dossier-update-assistant',
  templateUrl: './dossier-update-assistant.component.html',
  styleUrls: ['./dossier-update-assistant.component.css']
})
export class DossierUpdateAssistantComponent implements OnInit {
modalVisible: boolean = false;
   selectedDossier?: DossierJuridique;
  successMessage: string = '';
errorMessage: string = '';
  dossierId: number = 1; // ID du dossier pour lequel on souhaite afficher les mises à jour
  updates: DossierJuridiqueUpdate[] = [];
  newUpdate: DossierJuridiqueUpdate = {
    id: 0,
    dossierJuridique: undefined,
    evaluation: '',
    demandeDocuments: false,
    rendezVous: {} as RendezVous,
    note: '',
    dateCreation: undefined
  };
  isAddDocumentModalOpen = false; // Pour contrôler l'affichage du modal
  selectedFile: File | null = null; // Pour stocker le fichier sélectionné
  documentDescription: string = ''; // Pour stocker la description du document
  selectedUpdateForDocument: DossierJuridiqueUpdate | null = null; // Pour stocker la mise à jour sélectionnée
  selectedUpdate: DossierJuridiqueUpdate | null = null;
  idD: any;
  isModalOpen: boolean = false;
  id: number;
  isAddModalOpen: boolean = false;
  DossierId: number;
  dossier: DossierJuridique;
  qrCodeImageUrl: string = '';
  isUpdateModalOpen = false; //
  isAllDocumentsModalOpen = false; // Pour contrôler l'affichage du modal
documents: any[] = [];
  dossierid: number = 123;  // L'ID du dossier que vous voulez mettre à jour
  dossierUpdate: DossierJuridiqueUpdate = {
    evaluation: "L'affaire est en cours d'investigation.",
    demandeDocuments: true,
    rendezVous: {
      id: 22,
      dateHeure: new Date("2026-03-10T14:00:00"),
      motif: "Rendez-vous avec le juge",
      demandeParClient: false,
      avocat: { id: null }
    },
    note: "Nous avons besoin de documents supplémentaires pour avancer sur le dossier.",
    dateCreation: new Date("2025-03-12T12:55:54.277033")
  };
  avocatId: number;
  isClicked: boolean = false;
  constructor(  private documentService: DocumentService ,private toastr: ToastrService, private dossierUpdateService: DossierJuridiqueUpdateService,private route: ActivatedRoute, private DossierJuridiqueService : DossierJuridiqueService,private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.avocatId = Number(localStorage.getItem('id'));
     console.log('ID de l\'avocat :', this.avocatId);
    console.log("ngOnInit appelé"); // Vérifie si la méthode est appelée
    this.DossierId = +this.route.snapshot.paramMap.get('id');
    console.log('ID du dossier récupéré :', this.DossierId);

    this.loadDossier(this.DossierId);
   
    if (this.DossierId !== null) {
      this.loadUpdates();
    } else {
      console.error('ID non trouvé dans l\'URL');
    }
  }
  
  closeModal(modal: any): void {
    modal.close();  // Ferme ce modal spécifique
  }
  closeUpdateModal() {
    this.isUpdateModalOpen = false;
  }
  openQRCodeModal(qrCodeModal: any): void {
    this.generateQRCode(); // Générer le QR Code
    const modal = document.getElementById('qrCodeModal');
    this.modalService.open(qrCodeModal); 
    
    if (modal) {
      modal.classList.add('show'); // Afficher le modal
      modal.style.display = 'block';
      modal.style.zIndex = '0'; 
    }
  }
  closeAddModal() {
    this.isAddModalOpen = false;
  }
  openAddModal() {
    this.isAddModalOpen = true;
  }
  closeModall() {
    this.isAddModalOpen = false;
  }

  CreateUpdateDossier() {
    this.dossierUpdate.rendezVous.avocat = { id:this.avocatId };
    this.dossierUpdateService.createUpdate(this.DossierId, this.dossierUpdate).subscribe(
      (response) => {
 
       // this.successMessage = 'Dossier mis à jour avec succès';
        this.toastr.success('Mise à jour réussie', 'Succès');
        this.closeModall();
       // this.errorMessage = '';  // Reset en cas de succès
      
        this.loadUpdates(); // Recharger les mises à jour après modification
     
      },
      (error) => {
        this.toastr.error('Erreur lors de la mise à jour du dossier', 'Erreur');
     //   this.errorMessage = 'Erreur lors de la mise à jour du dossier';
        console.error('Erreur lors de la mise à jour du dossier :', error);
      }
    );
  }
  openAddDocumentModal(update: DossierJuridiqueUpdate): void {
    this.selectedUpdateForDocument = update; // Stocker la mise à jour sélectionnée
    this.isAddDocumentModalOpen = true; // Ouvrir le modal
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Récupérer le fichier sélectionné

  }
// Fermer le modal des documents
closeAllDocumentsModal(): void {
  this.isAllDocumentsModalOpen = false;
  this.documents = []; // Réinitialiser la liste des documents
}
openAllDocumentsModal(): void {
  this.isAllDocumentsModalOpen = true;
  this.documentService.getDocumentsByDossierId(this.dossier.id).subscribe(
    (documents) => {
      this.documents = documents;
    },
    (error) => {
      this.toastr.error('Erreur lors de la récupération des documents', 'Erreur');
      console.error('Erreur lors de la récupération des documents :', error);
    }
  );
}

  uploadDocument(): void {
    if (this.selectedFile && this.selectedUpdateForDocument) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('description', this.documentDescription);
      formData.append('dossierUpdateId', this.selectedUpdateForDocument.id.toString()); // Ajouter l'ID de la mise à jour
      formData.append('dossierId', this.DossierId.toString()); // Ajouter l'ID du dossier
  
      this.documentService.uploadDocument(this.selectedFile, this.DossierId, this.selectedUpdateForDocument.id).subscribe(
        (response) => {

          this.toastr.success('Document ajouté avec succès !', 'Succès');
          this.closeAddDocumentModal(); // Fermer le modal
    this.loadUpdates();
          // Mettre à jour l'état de demandeDocuments pour masquer le bouton
          this.selectedUpdateForDocument.demandeDocuments = false;
  
          // Recharger les mises à jour pour afficher les documents ajoutés
          this.loadUpdates();
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'ajout du document', 'Erreur');
          console.error('Erreur lors du téléversement du document :', error);
        }
      );
    } else {
      this.toastr.error('Veuillez sélectionner un fichier', 'Erreur');
    }
  }
  closeAddDocumentModal(): void {
    this.isAddDocumentModalOpen = false;
    this.selectedFile = null;
    this.documentDescription = '';
    this.selectedUpdateForDocument = null;
  }
  loadDossier(id: number): void {
    this. DossierJuridiqueService.getDossierById(id).subscribe(
      (data) => {
        this.dossier = data;
        
        console.log('Dossier chargé:', this.dossier); // Vérifiez les données du dossier
        this.generateQRCode();
 
      },
      (error) => {
        console.error('Erreur lors du chargement du dossier :', error);
      }
    );
  }
  openModal(dossier: DossierJuridique): void {
    this.selectedDossier = { ...dossier }; // Crée une copie du dossier
    this.modalVisible = true;
    this.isUpdateModalOpen = true;
  }
  generateQRCode() {
    if (!this.dossier ) {
      console.error('Dossier ou informations client indisponibles.');
      return;
    }
  
    const qrData = {
      id: this.dossier.id,
      reference: this.dossier.reference,
      clientNom: this.dossier.client?.firstname ?? 'pas insecrit ', // Valeur par défaut si null ou undefined
      clientPrenom: this.dossier.client?.lastname ?? 'pas insecrit', // Valeur par défaut si null ou undefined
      clientEmail: this.dossier.emailClient ?? 'Email Inconnu', // Si emailClient est null ou undefined, valeur par défaut
      dateCreation: this.dossier.dateCreation ?? 'Date Inconnue', // Si dateCreation est null ou undefined
    };
    
    QRCode.toDataURL(JSON.stringify(qrData), { errorCorrectionLevel: 'H' })
      .then(url => this.qrCodeImageUrl = url)
      .catch(err => console.error('Erreur lors de la génération du QR Code:', err));
  }

  loadUpdates(): void {
    this.dossierUpdateService.getAllUpdates(this.DossierId).subscribe(
      (data) => {
        this.updates = data.sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime());
  
        // Charger les documents pour chaque mise à jour
        this.updates.forEach((update) => {
          this.documentService.getDocumentsByDossierUpdateId(update.id).subscribe(
            (documents) => {
              update.documents = documents; // Associer les documents à la mise à jour
            },
            (error) => {
              console.error('Erreur lors du chargement des documents :', error);
            }
          );
        });
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement des mises à jour', 'Erreur');
        console.error('Erreur lors de la récupération des mises à jour :', error);
      }
    );
  }
  

 // Fonction de mise à jour
updateUpdate(): void {
  if (!this.selectedUpdate || !this.selectedUpdate.id) {
    this.showError('L\'ID du dossier est manquant!');
    return; // Stopper la mise à jour si l'ID est manquant
  }

  console.log('Mise à jour sélectionnée:', this.selectedUpdate);

  this.dossierUpdateService.updateDossierUpdate(this.selectedUpdate.id, this.selectedUpdate).subscribe(
    (response) => {
      this.showSuccess('Mise à jour réussie');
      this.errorMessage = ''; // Réinitialiser les erreurs
      this.closeModall();
     
      // Fermer le modal après mise à jour
      this.loadUpdates(); // Rafraîchir la liste des mises à jour
      
     
      this.isUpdateModalOpen = true;
    },
    (error) => {
      this.showError('Erreur lors de la mise à jour');
    }
  );
}
closeModale(): void {
  this.isUpdateModalOpen = false;
  this.isAddModalOpen = false;
  this.isUpdateModalOpen = false;
  this.modalVisible = false;
}
showSuccess(message: string) {
  this.toastr.success(message, 'Succès');
}

// Fonction pour afficher un message d'erreur
showError(message: string) {
  this.toastr.error(message, 'Erreur');
}
updateDossier(): void {
    if (!this.selectedDossier) {
      this.showError('Veuillez sélectionner un dossier à mettre à jour.');
      return;
    }

    console.log('Dossier à mettre à jour:', this.selectedDossier);

    if (!this.selectedDossier.id) {
      this.showError('ID du dossier manquant!');
      return;
    }

    this.DossierJuridiqueService.updateDossier(this.selectedDossier.id, this.selectedDossier).subscribe(
      (data) => {
        console.log('Dossier mis à jour:', data);
        this.closeModale();
        this.showSuccess('Dossier mis à jour avec succès!');
     
        
        this.loadDossier(this.DossierId); // Recharger le dossier mis à jour
        
      },
      (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        this.showError('Erreur lors de la mise à jour du dossier.');
      }
    );
  }


// Ouvrir le modal avec les détails du dossier sélectionné
openUpdateDossierModal(dossier: any) {
  this.selectedDossier = { ...dossier }; // Clone pour éviter de modifier directement l'objet
  this.modalVisible = true;
}

openUpdateModall(update: DossierJuridiqueUpdate): void {
  this.selectedUpdate = { ...update }; // Copier les données pour éviter la modification en direct
  this.isUpdateModalOpen = true;
  console.log('Mise à jour sélectionnée:', this.selectedUpdate);
}
  // Créer une nouvelle mise à jour
  
  createUpdate(): void {
    this.dossierUpdateService.createUpdate(this.dossierId, this.newUpdate).subscribe(
      (data) => {
        console.log('Mise à jour créée:', data);
        this.loadUpdates();
        this.toastr.success('Mise à jour créée avec succès!', 'Succès'); // Recharger les mises à jour après création
      },
      (error) => {
        this.toastr.error('Erreur lors de la création de la mise à jour', 'Erreur');
        console.error('Erreur lors de la création de la mise à jour :', error);
      }
    );
  }

  // Sélectionner une mise à jour pour l'affichage ou la modification
  selectUpdate(update: DossierJuridiqueUpdate): void {
    this.selectedUpdate = update;
  }

  openDeleteConfirmationModal(deleteModal: any, updateId: number): void {
    const modalRef = this.modalService.open(deleteModal, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.updateId = updateId; // Passer l'ID de la mise à jour à supprimer
  }
  downloadDocument(documentId: number, documentName: string): void {
    this.documentService.downloadDocument(documentId).subscribe(
      (blob: Blob) => {
        // Créer un lien pour déclencher le téléchargement
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = documentName; // Nom du fichier à télécharger
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Libérer l'URL de l'objet Blob
      },
      (error) => {
        this.toastr.error('Erreur lors du téléchargement du document', 'Erreur');
        console.error('Erreur lors du téléchargement du document :', error);
      }
    );
  }
  // Supprimer une mise à jour
  deleteUpdate(id: number): void {
    this.dossierUpdateService.deleteDossierUpdate(id).subscribe(
      () => {
        console.log('Mise à jour supprimée');
        this.toastr.success('Mise à jour supprimée avec succès!', 'Succès');
        this.loadUpdates(); // Recharger les mises à jour après suppression
      },
      (error) => {
        this.toastr.error('Erreur lors de la suppression de la mise à jour', 'Erreur');
        console.error('Erreur lors de la suppression de la mise à jour :', error);
      }
    );
  }
 // Fermer le modal

 
 
  printQRCode(): void {
    const printWindow = window.open('', '_blank', 'width=600,height=600');
    printWindow.document.write('<html><head><title>Imprimer QR Code</title></head><body>');
    printWindow.document.write('<img src="' + this.qrCodeImageUrl + '" />'); // Ajoute le QR code à la page à imprimer
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
  
}