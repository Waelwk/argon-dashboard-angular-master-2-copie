import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assistant } from 'src/app/Models/assistant';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
@Component({
  selector: 'app-liste-assistant-archivee',
  templateUrl: './liste-assistant-archivee.component.html',
  styleUrls: ['./liste-assistant-archivee.component.css']
})
export class ListeAssistantArchiveeComponent implements OnInit {
Assistant: Assistant[] = [];
  newAssistant: any = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    domaine:'',
    role: 'ASSISTANT',
    cabinet: {
      nom: '',
      adresse: '',
      numTel: '',
      email: '',
    },
  };

  selectedAssistant: Assistant| null = null;
  isAddModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  isArchiveModalOpen: boolean = false; // New variable for archive modal
  AssistantToDeleteId: number | null = null;
  AssistantToArchiveId: number | null = null; // New variable to store Assistant ID to archive
  cabinetId: number;
  Assistantt: Assistant[];

  constructor(private route: ActivatedRoute,private AssistantService:AssistantService) {}

  ngOnInit(): void {
    this.cabinetId = +this.route.snapshot.paramMap.get('id');
    console.log('ID du cabinet :', this.cabinetId);
    this.loadAssistantsByCabinetId(this.cabinetId);
    this.loadAssistantsByCabinetIdA(this.cabinetId);
    this.cabinetId = +this.route.snapshot.paramMap.get('id')!;
    this.newAssistant.cabinetId = this.cabinetId;
  }
  loadAssistantsByCabinetId(cabinetId: number): void {
    this.AssistantService.getAllAssistant().subscribe(
      (data) => {
        console.log('Données reçues:', data); // Vérifie les données complètes
        console.log('ID Cabinet recherché:', cabinetId, 'Type:', typeof cabinetId);

        if (data && Array.isArray(data)) {
          this.Assistant = data.filter(assistant => 
            assistant.cabinet && Number(assistant.cabinet.id) === Number(cabinetId) && assistant.archivee === false
          );

          console.log('Résultat filtré:', this.Assistant); // Vérifie le résultat filtré
        } else {
          console.error('Données incorrectes:', data);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des assistants:', error);
      }
    );
}
loadAssistantsByCabinetIdA(cabinetId: number): void {
  this.AssistantService.getAllAssistant().subscribe(
    (data) => {
      console.log('Données reçues:', data); // Vérifie les données complètes
      console.log('ID Cabinet recherché:', cabinetId, 'Type:', typeof cabinetId);

      if (data && Array.isArray(data)) {
        this.Assistantt = data.filter(assistant => 
          assistant.cabinet && Number(assistant.cabinet.id) === Number(cabinetId) && assistant.archivee === true
        );

        console.log('Résultat filtré:', this.Assistant); // Vérifie le résultat filtré
      } else {
        console.error('Données incorrectes:', data);
      }
    },
    (error) => {
      console.error('Erreur lors du chargement des assistants:', error);
    }
  );
}
  // Load all Assistants
  // loadAssistants(): void {
  //   this.AssistantService.getAllAssistant().subscribe(
  //     (data) => {
  //       this.Assistant = data;
  //     },
  //     (error) => {
  //       console.error('Error loading Assistants:', error);
  //     }
  //   );
  // }

  // Open archive modal
  openArchiveModal(AssistantId: number): void {
    this.AssistantToArchiveId = AssistantId;
    this.isArchiveModalOpen = true;
  }

  // Confirm archiving
  confirmArchive(): void {
    if (this.AssistantToArchiveId) {
      this.AssistantService.desarchiveAssistant(this.AssistantToArchiveId).subscribe(
        (response) => {
          console.log('Assistant archived successfully:', response);
          this.loadAssistantsByCabinetId(this.cabinetId);
          this.loadAssistantsByCabinetIdA(this.cabinetId); // Reload Assistants list
          this.closeModal();
        },
        (error) => {
          console.error('Error archiving Assistant:', error);
        }
      );
    }
  }

  // Close all modals
  closeModal(): void {
    this.isAddModalOpen = false;
    this.isUpdateModalOpen = false;
    this.isDeleteModalOpen = false;
    this.isArchiveModalOpen = false; // Close archive modal
    this.selectedAssistant = null;
    this.AssistantToDeleteId = null;
    this.AssistantToArchiveId = null;
  }

  // Open add modal
  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  // Add Assistant
  addAssistant(): void {
    this.AssistantService.register(this.newAssistant).subscribe(
      (response) => {
        console.log('Assistant added successfully:', response);
        this.loadAssistantsByCabinetId(this.cabinetId);
        this.closeModal();
        this.resetForm();
      },
      (error) => {
        console.error('Error adding Assistant:', error);
      }
    );
  }

  // Open update modal
  openUpdateModal(Assistant: Assistant): void {
    this.selectedAssistant = { ...Assistant };
    this.isUpdateModalOpen = true;
  }

  // Update Assistant
  updateAssistant(): void {
    if (this.selectedAssistant) {
      this.AssistantService.updateAssistant(this.selectedAssistant.id, this.selectedAssistant).subscribe(
        (response) => {
          console.log('Assistant updated successfully:', response);
          this.loadAssistantsByCabinetId(this.cabinetId);
          this.closeModal();
        },
        (error) => {
          console.error('Error updating Assistant:', error);
        }
      );
    }
  }

  // Open delete modal
  openDeleteModal(AssistantId: number): void {
    this.AssistantToDeleteId = AssistantId;
    this.isDeleteModalOpen = true;
  }

  // Delete Assistant (implementation needed)
  deleteAssistant(): void {
    
  }

  // Reset form
  resetForm(): void {
    this.newAssistant = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: 'Assistant',
    domaine: '',
    };
  }
}