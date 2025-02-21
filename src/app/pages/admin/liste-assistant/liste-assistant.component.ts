import { Component, OnInit } from '@angular/core';
import { Domain } from 'domain';
import { Assistant } from 'src/app/Models/assistant';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
@Component({
  selector: 'app-liste-assistant',
  templateUrl: './liste-assistant.component.html',
  styleUrls: ['./liste-assistant.component.css']
})
export class ListeAssistantComponent implements OnInit {
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

  constructor(private AssistantService:AssistantService) {}

  ngOnInit(): void {
    this.loadAssistants();
  }

  // Load all Assistants
  loadAssistants(): void {
    this.AssistantService.getAllAssistant().subscribe(
      (data) => {
        this.Assistant = data;
      },
      (error) => {
        console.error('Error loading Assistants:', error);
      }
    );
  }

  // Open archive modal
  openArchiveModal(AssistantId: number): void {
    this.AssistantToArchiveId = AssistantId;
    this.isArchiveModalOpen = true;
  }

  // Confirm archiving
  confirmArchive(): void {
    if (this.AssistantToArchiveId) {
      this.AssistantService.archiveAssistant(this.AssistantToArchiveId).subscribe(
        (response) => {
          console.log('Assistant archived successfully:', response);
          this.loadAssistants(); // Reload Assistants list
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
        this.loadAssistants();
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
          this.loadAssistants();
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