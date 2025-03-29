import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assistant } from 'src/app/Models/assistant';
import { Avocat } from 'src/app/Models/avocat';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
import * as CryptoJS from 'crypto-js';  // Import de CryptoJS
@Component({
  selector: 'app-lisste-avocat-cabinet',
  templateUrl: './lisste-avocat-cabinet.component.html',
  styleUrls: ['./lisste-avocat-cabinet.component.css']
})
export class LissteAvocatCabinetComponent implements OnInit {
avocats: Avocat[] = [];
  avocatsA:Avocat[] = [];
  

  selectedAvocat: Avocat | null = null;
  isAddModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  isArchiveModalOpen: boolean = false; // New variable for archive modal
  avocatToDeleteId: number | null = null;
  avocatToArchiveId: number | null = null; // New variable to store avocat ID to archive
  cabinetId: number;
  
  IDCabinet: number; // Declare the missing property
  AsisstantID: number; // Declare the missing property

  assistant: Assistant | undefined;
  isLoading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private avocatService: AvocatService, private assistantService: AssistantService) {}
   

  ngOnInit(): void {
    this.AsisstantID= Number(localStorage.getItem('id'));
    console.log('is', this.AsisstantID)

    this.loadAvocatsByCabinetId(this.cabinetId);
    this.loadAvocatsByCabinetIdA(this.cabinetId);


    if (this.AsisstantID) {
      this.getAssistant(this.AsisstantID);
    }
    console.log(this.loadAvocatsByCabinetIdA(this.cabinetId));
    console.log(this.loadAvocatsByCabinetId(this.cabinetId));
 
  
  }
 
  getAssistant(id: number): void {
    this.isLoading = true;
    this.assistantService.getAssistantById(id).subscribe({
      next: (data) => {
        this.assistant = data;
        
        // Vérifie si l'objet cabinet est présent dans la réponse
        if (this.assistant && this.assistant.cabinet) {
          this.cabinetId = this.assistant.cabinet.id;
          console.log('ID du cabinet:', this.cabinetId);
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
  
  // Load all avocats
  // loadAvocats(): void {
  //   this.avocatService.getAllAvocats().subscribe(
  //     (data) => {
  //       this.avocats = data;
  //     },
  //     (error) => {
  //       console.error('Error loading avocats:', error);
  //     }
  //   );
  // }
  loadAvocatsByCabinetId(cabinetId: number): void {
    this.avocatService.getAllAvocats().subscribe(
      (data: Avocat[]) => {
        console.log('Données reçues:', data); // Vérifie les données complètes
        console.log('ID Cabinet recherché:', this.cabinetId, 'Type:', typeof cabinetId);
  
        if (data && Array.isArray(data)) {
          this.avocats = data.filter((avocat: Avocat) => 
            avocat.cabinet && Number(avocat.cabinet.id) === Number(this.cabinetId) && avocat.archivee === false
          );
  
          console.log('Résultat filtré:', this.avocats); // Vérifie le résultat filtré
        } else {
          console.error('Données incorrectes:', data);
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement des avocats:', error);
      }
    );
  }   
   loadAvocatsByCabinetIdA(cabinetId: number): void {
    this.avocatService.getAllAvocats().subscribe(
      (data) => {
        console.log('Données reçues:', data); // Vérifie les données complètes
        console.log('ID Cabinet recherché:', this.cabinetId, 'Type:', typeof this.cabinetId,);
  
        if (data && Array.isArray(data)) {
          this.avocatsA = data.filter(avocat => 
            avocat.cabinet && Number(avocat.cabinet.id) === Number(this.cabinetId)&& avocat.archivee ==true
          );
  
          console.log('Résultat filtré:', this.avocatsA); // Vérifie le résultat filtré
        } else {
          console.error('Données incorrectes:', data);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des avocats:', error);
      }
    );
  }  
  
  


  // // Open archive modal
  // openArchiveModal(avocatId: number): void {
  //   this.avocatToArchiveId = avocatId;
  //   this.isArchiveModalOpen = true;
  // }

  // // Confirm archiving
  // confirmArchive(): void {
  //   if (this.avocatToArchiveId) {
  //     this.avocatService.archiveAvocat(this.avocatToArchiveId).subscribe(
  //       (response) => {
  //         console.log('Avocat archived successfully:', response);
  //         this.loadAvocatsByCabinetId(this.cabinetId);
  //         this.loadAvocatsByCabinetIdA(this.cabinetId); // Reload avocats list
  //         this.closeModal();
  //       },
  //       (error) => {
  //         console.error('Error archiving avocat:', error);
  //       }
  //     );
  //   }
  // }

  // // Close all modals
  // closeModal(): void {
  //   this.isAddModalOpen = false;
  //   this.isUpdateModalOpen = false;
  //   this.isDeleteModalOpen = false;
  //   this.isArchiveModalOpen = false; // Close archive modal
  //   this.selectedAvocat = null;
  //   this.avocatToDeleteId = null;
  //   this.avocatToArchiveId = null;
  // }

  // // Open add modal
  // openAddModal(): void {
  //   this.isAddModalOpen = true;
  // }

  // // Add avocat
  // addAvocat(): void {
  //   this.avocatService.register(this.newAvocat).subscribe(
  //     (response) => {
  //       console.log('Avocat added successfully:', response);
  //       this.loadAvocatsByCabinetId(this.cabinetId);
  //       this.closeModal();
  //       this.resetForm();
  //     },
  //     (error) => {
  //       console.error('Error adding avocat:', error);
  //     }
  //   );
  // }

  // // Open update modal
  // openUpdateModal(avocat: Avocat): void {
  //   this.selectedAvocat = { ...avocat };
  //   this.isUpdateModalOpen = true;
  // // }

  // // Update avocat
  // updateAvocat(): void {
  //   if (this.selectedAvocat) {
  //     this.avocatService.updateAvocat(this.selectedAvocat.id, this.selectedAvocat).subscribe(
  //       (response) => {
  //         console.log('Avocat updated successfully:', response);
  //         this.loadAvocatsByCabinetId(this.cabinetId);
  //         this.closeModal();
  //       },
  //       (error) => {
  //         console.error('Error updating avocat:', error);
  //       }
  //     );
  //   }
  // }

  // // Open delete modal
  // openDeleteModal(avocatId: number): void {
  //   this.avocatToDeleteId = avocatId;
  //   this.isDeleteModalOpen = true;
  // }

  // // Delete avocat (implementation needed)
  // deleteAvocat(): void {
    
  // }

  // // Reset form
  // resetForm(): void {
  //   this.newAvocat = {
  //     firstname: '',
  //     lastname: '',
  //     email: '',
  //     password: '',
  //     role: 'AVOCAT',
     
  //   };
  // }
}