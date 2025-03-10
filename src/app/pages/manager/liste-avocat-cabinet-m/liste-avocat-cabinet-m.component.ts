import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Avocat } from 'src/app/Models/avocat';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';

@Component({
  selector: 'app-liste-avocat-cabinet-m',
  templateUrl: './liste-avocat-cabinet-m.component.html',
  styleUrls: ['./liste-avocat-cabinet-m.component.css']
})
export class ListeAvocatCabinetMComponent implements OnInit {
avocats: Avocat[] = [];
  avocatsA:Avocat[] = [];
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
  cabinetId: number;

 

  constructor(private route: ActivatedRoute,private avocatService: AvocatService) {}

  ngOnInit(): void {
    this.loadAvocatsByCabinetId(this.cabinetId);
    this.loadAvocatsByCabinetIdA(this.cabinetId);
    this.cabinetId = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.loadAvocatsByCabinetIdA(this.cabinetId));
    console.log(this.loadAvocatsByCabinetId(this.cabinetId));
    this.newAvocat.cabinetId = this.cabinetId;

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
      (data) => {
        console.log('Données reçues:', data); // Vérifie les données complètes
        console.log('ID Cabinet recherché:', cabinetId, 'Type:', typeof cabinetId);
  
        if (data && Array.isArray(data)) {
          this.avocats = data.filter(avocat => 
            avocat.cabinet && Number(avocat.cabinet.id) === Number(cabinetId)&& avocat.archivee === false
          );
  
          console.log('Résultat filtré:', this.avocats); // Vérifie le résultat filtré
        } else {
          console.error('Données incorrectes:', data);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des avocats:', error);
      }
    );
  }   
   loadAvocatsByCabinetIdA(cabinetId: number): void {
    this.avocatService.getAllAvocats().subscribe(
      (data) => {
        console.log('Données reçues:', data); // Vérifie les données complètes
        console.log('ID Cabinet recherché:', cabinetId, 'Type:', typeof cabinetId);
  
        if (data && Array.isArray(data)) {
          this.avocatsA = data.filter(avocat => 
            avocat.cabinet && Number(avocat.cabinet.id) === Number(cabinetId)&& avocat.archivee ==true
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
          this.loadAvocatsByCabinetId(this.cabinetId);
          this.loadAvocatsByCabinetIdA(this.cabinetId); // Reload avocats list
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
        this.loadAvocatsByCabinetId(this.cabinetId);
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
          this.loadAvocatsByCabinetId(this.cabinetId);
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