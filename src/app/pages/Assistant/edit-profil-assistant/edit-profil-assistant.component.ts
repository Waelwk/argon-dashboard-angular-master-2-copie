import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assistant } from 'src/app/Models/assistant';
import { AssistantService } from 'src/app/service/Assistant/assistant.service';

@Component({
  selector: 'app-edit-profil-assistant',
  templateUrl: './edit-profil-assistant.component.html',
  styleUrls: ['./edit-profil-assistant.component.css']
})
export class EditProfilAssistantComponent implements OnInit {
  assistant: Assistant;  // Stocke les données de l'assistant
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;
  assistantId: number;
  constructor(
    private assistantService: AssistantService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assistantId = parseInt(localStorage.getItem('id') || '0', 10);  // Récupère l'ID de l'assistant depuis l'URL
    if ( this.assistantId) {
      this.assistantService.getAssistantById( this.assistantId).subscribe(
        (data: Assistant) => {
          this.assistant = data;
          this.assistant.password = ''; 
          console.log('Données de l\'assistant récupérées:', this.assistant);
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'assistant', error);
          this.toastr.error('Erreur lors de la récupération de l\'assistant');
        }
      );
    }
  }

  // Méthode pour mettre à jour les informations de l'assistant
  updateAssistant(): void {
    // Vérification des mots de passe
    if (this.assistant.password && this.assistant.password !== this.confirmPassword) {
      this.toastr.error('Les mots de passe ne correspondent pas');
      return;
    }

    // Créer une copie de assistant pour envoyer la mise à jour
    const updatedAssistant = { ...this.assistant };

    // Ne pas envoyer le champ password si celui-ci est vide
    if (!updatedAssistant.password || updatedAssistant.password.trim() === '') {
      delete updatedAssistant.password;
    }

    this.assistantService.updateAssistant(this.assistant.id, updatedAssistant).subscribe(
      () => {
        this.toastr.success('Profil de l\'assistant mis à jour avec succès');

      },
      (error) => {
        this.toastr.error('Erreur lors de la mise à jour de l\'assistant');
      }
    );
  }

  
  
}