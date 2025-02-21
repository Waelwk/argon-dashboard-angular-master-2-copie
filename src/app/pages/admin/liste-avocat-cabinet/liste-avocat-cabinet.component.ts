import { Component, OnInit } from '@angular/core';
import { Avocat } from 'src/app/Models/avocat';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';

@Component({
  selector: 'app-liste-avocat-cabinet',
  templateUrl: './liste-avocat-cabinet.component.html',
  styleUrls: ['./liste-avocat-cabinet.component.css']
})
export class ListeAvocatCabinetComponent implements OnInit {
  avocats: Avocat[] = [];
  newAvocat: any = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'AVOCAT',
    cabinet: {
      nom: '',
      adresse: '',
      numTel: '',
      email: '',
    },
  };

  selectedAvocat: Avocat | null = null;
  isAddModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  isArchiveModalOpen: boolean = false; // New variable for archive modal
  avocatToDeleteId: number | null = null;
  avocatToArchiveId: number | null = null; // New variable to store avocat ID to archive

  constructor(private avocatService: AvocatService) {}

  ngOnInit(): void {
    this.loadAvocats();
  }

  // Load all avocats
  loadAvocats(): void {
    this.avocatService.getAllAvocats().subscribe(
      (data) => {
        this.avocats = data;
      },
      (error) => {
        console.error('Error loading avocats:', error);
      }
    );
  }

  // Open archive modal
  openArchiveModal(avocatId: number): void {
    this.avocatToArchiveId = avocatId;
    this.isArchiveModalOpen = true;
  }

  // Confirm archiving
  confirmArchive(): void {
    if (this.avocatToArchiveId) {
      this.avocatService.archiveAvocat(this.avocatToArchiveId).subscribe(
        (response) => {
          console.log('Avocat archived successfully:', response);
          this.loadAvocats(); // Reload avocats list
          this.closeModal();
        },
        (error) => {
          console.error('Error archiving avocat:', error);
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
    this.selectedAvocat = null;
    this.avocatToDeleteId = null;
    this.avocatToArchiveId = null;
  }

  // Open add modal
  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  // Add avocat
  addAvocat(): void {
    this.avocatService.register(this.newAvocat).subscribe(
      (response) => {
        console.log('Avocat added successfully:', response);
        this.loadAvocats();
        this.closeModal();
        this.resetForm();
      },
      (error) => {
        console.error('Error adding avocat:', error);
      }
    );
  }

  // Open update modal
  openUpdateModal(avocat: Avocat): void {
    this.selectedAvocat = { ...avocat };
    this.isUpdateModalOpen = true;
  }

  // Update avocat
  updateAvocat(): void {
    if (this.selectedAvocat) {
      this.avocatService.updateAvocat(this.selectedAvocat.id, this.selectedAvocat).subscribe(
        (response) => {
          console.log('Avocat updated successfully:', response);
          this.loadAvocats();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating avocat:', error);
        }
      );
    }
  }

  // Open delete modal
  openDeleteModal(avocatId: number): void {
    this.avocatToDeleteId = avocatId;
    this.isDeleteModalOpen = true;
  }

  // Delete avocat (implementation needed)
  deleteAvocat(): void {
    
  }

  // Reset form
  resetForm(): void {
    this.newAvocat = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: 'AVOCAT',
     
    };
  }
}