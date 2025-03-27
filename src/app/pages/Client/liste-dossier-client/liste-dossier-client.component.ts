import { Component, OnInit } from "@angular/core";
import { DossierJuridique } from "src/app/Models/ DossierJuridique";
import { AccessCode } from "src/app/Models/AccessCode";
import { AccessCodeService } from "src/app/service/access-code /access-code.service";


@Component({
  selector: 'app-liste-dossier-client',
  templateUrl: './liste-dossier-client.component.html',
  styleUrls: ['./liste-dossier-client.component.css']
})
export class ListeDossierClientComponent implements OnInit {
  codes: AccessCode[] = [];
  dossiers: DossierJuridique[] = [];
  loading = false;
  error: string | null = null;
  nouveauCode: string = '';
  message: string = '';
  ClientId: number = 308; // ID du client (peut être récupéré dynamiquement)

  constructor(private accessCodeService: AccessCodeService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ajouterCode(): void {
    if (!this.nouveauCode.trim()) {
      alert('Veuillez saisir un code valide.');
      return;
    }

    this.accessCodeService.addAccessCode(this.ClientId, this.nouveauCode).subscribe({
      next: (response) => {
        this.message = `Code ajouté : ${response.code}`;
        this.nouveauCode = ''; // Réinitialise l'input
        this.loadData(); // Recharge les données après ajout
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors de l\'ajout du code.';
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
        this.error = 'Erreur lors du chargement des données';
        this.loading = false;
        console.error('Détails erreur:', err);
      }
    });
  }
}
