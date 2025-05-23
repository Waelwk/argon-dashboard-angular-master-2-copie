import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assistant } from 'src/app/Models/assistant';
import { Avocat } from 'src/app/Models/avocat';
import { Cabinet } from 'src/app/Models/cabinet';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';
import { CabinetService } from 'src/app/service/cabinet/cabinet.service';
import { DossierJuridiqueService } from 'src/app/service/DossierJuridiques/dossier-juridique.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetMComponent implements OnInit {
 cabinetId: number;
  cabinet: Cabinet;  // Le cabinet du gestionnaire
  assistants: Assistant[] = []; // Liste des assistants filtrés
  avocats: Avocat[] = []; // Liste des avocats filtrés
  dossiers: any[] = []; // Liste des dossiers
  errorMessage: string;
  selectedCabinet: Cabinet | null = null;
  isUpdateModalOpen: boolean= false
  
  constructor(  private toastr: ToastrService,
    private avocatService: AvocatService,
    private assistantService: AssistantService,
    private route: ActivatedRoute,
    private cabinetService: CabinetService,
    private authService: AuthService,private dossierService: DossierJuridiqueService
  ) { }
  
  ngOnInit(): void {
    this.loadCabinetAndAssociates();
    this.cabinet;
    const managerId = this.getManagerIdFromLocalStorage();
  }
  
  // Charger le cabinet du gestionnaire et ses assistants/avocats
  loadCabinetAndAssociates(): void {
    this.cabinetService.getAllCabinets().subscribe({
      next: (data) => {
        // Récupérer l'ID du gestionnaire
        const managerId = this.getManagerIdFromLocalStorage();
        
        // Trouver le cabinet correspondant à l'ID du gestionnaire
        this.cabinet = data.find(cabinet => cabinet.manager.id === managerId);
        
        if (this.cabinet) {
          this.cabinetId = this.cabinet.id;
          console.log('Cabinet trouvé:', this.cabinet);
          this.loadAssistantsByCabinetId(this.cabinet.id); // Charger les assistants du cabinet
          this.loadAvocatsByCabinetId(this.cabinet.id); // Charger les avocats du cabinet
        } else {
          console.log('Aucun cabinet trouvé pour ce gestionnaire.');
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des cabinets :', err);
      }
    });
  }

  // Récupérer l'ID du gestionnaire depuis le localStorage
  getManagerIdFromLocalStorage(): number {
    const managerId = localStorage.getItem('id');
    return managerId ? Number(managerId) : null;
  }

  // Charger les assistants pour ce cabinet spécifique
  loadAssistantsByCabinetId(cabinetId: number): void {
    this.assistantService.getAllAssistant().subscribe(
      (data) => {
        console.log('Assistants reçus:', data);
        this.assistants = data.filter(assistant => assistant.cabinet && assistant.cabinet.id === cabinetId);
        console.log('Assistants filtrés:', this.assistants);
      },
      (error) => {
        console.error('Erreur lors du chargement des assistants:', error);
      }
    );
  }

  // Charger les avocats pour ce cabinet spécifique
  loadAvocatsByCabinetId(cabinetId: number): void {
    this.avocatService.getAllAvocats().subscribe(
      (data) => {
        console.log('Avocats reçus:', data);
        this.avocats = data.filter(avocat => avocat.cabinet && avocat.cabinet.id === cabinetId);
        console.log('Avocats filtrés:', this.avocats);
      },
      (error) => {
        console.error('Erreur lors du chargement des avocats:', error);
      }
    );
  }
  getAllDossiers(): void {
    this.dossierService.getAllDossiers().subscribe(
      (data) => {
        // Filtrer les dossiers en fonction de l'ID du cabinet
        this.dossiers = data.filter(dossier => dossier.cabinet.id === this.cabinetId);
        console.log('Dossierss filtrés:', this.dossiers);
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des dossiers.';
      }
    );
  }  openUpdateModal(cabinet: Cabinet): void {
    this.selectedCabinet = { ...cabinet }; // Ensure the cabinet data is copied
    this.isUpdateModalOpen = true;
  }
  onUpdateCabinet(): void {
    if (this.selectedCabinet) {
      this.cabinetService.updateCabinet(this.selectedCabinet.id, this.selectedCabinet).subscribe({
        next: (updatedCabinet) => {
          console.log('Cabinet updated successfully:', updatedCabinet);
          this.loadCabinetAndAssociates();
          this.closeModal();
       
          this.toastr.success('Cabinet mis à jour avec succès ✅');
        },
        error: (err) => {
          this.toastr.error('Error updating cabinet:', err);
        }
      });
    }
  }
  closeModal(): void {

    this.isUpdateModalOpen = false;

    this.selectedCabinet = null;
  }
  loadCabinets() {
    throw new Error('Method not implemented.');
  }
 
}
