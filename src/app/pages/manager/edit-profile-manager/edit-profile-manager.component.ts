import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Manager } from 'src/app/Models/manager';
import { ManagerService } from 'src/app/service/user/manager.service';

@Component({
  selector: 'app-edit-profile-manager',
  templateUrl: './edit-profile-manager.component.html',
  styleUrls: ['./edit-profile-manager.component.css']
})
export class EditProfileManagerComponent implements OnInit {
manager: Manager = {} as Manager;

confirmPassword: string = '';
passwordsDoNotMatch: boolean = false;
managerId
  constructor(
    private managerService: ManagerService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    this.managerId = localStorage.getItem('id'); // Récupérer l'ID du manager depuis les paramètres de la route
console.log('ID du manager :', this.managerId);
    this.managerService.getUserById(this.managerId).subscribe(
      (data: Manager) => {
        this.manager = data;
        this.manager.password = '';  // Remplir le formulaire avec les données récupérées
      },
      (error) => {
        this.toastr.error("Erreur lors de la récupération des informations du manager");
      }
    );
  }
  updateManager(): void {
    // Vérification si les mots de passe correspondent
    this.passwordsDoNotMatch = this.manager.password !== this.confirmPassword;
    
    // Si les mots de passe ne correspondent pas
    if (this.passwordsDoNotMatch && this.manager.password && this.confirmPassword) {
      this.toastr.error('Les mots de passe ne correspondent pas');
      return;
    }
  
    // Vérification si le mot de passe respecte la longueur minimale (si le mot de passe n'est pas vide)
    if (this.manager.password && this.manager.password.length < 8) {
      this.toastr.error('Le mot de passe doit comporter au moins 8 caractères');
      return;
    }
    
    // Vérification de la confirmation du mot de passe (si le mot de passe n'est pas vide)
    if (this.confirmPassword && this.confirmPassword.length < 8) {
      this.toastr.error('La confirmation du mot de passe doit comporter au moins 8 caractères');
      return;
    }

    // Si le mot de passe est vide, ne pas l'envoyer dans la requête
    const updatedManager = { ...this.manager };
  
    // Si le champ mot de passe est vide, on le supprime pour ne pas l'envoyer
    if (!updatedManager.password || updatedManager.password.trim() === '') {
      delete updatedManager.password;
    }
  
    // Effectuer la mise à jour de l'utilisateur
    this.managerService.updateUser(this.manager.id!, updatedManager).subscribe(
      () => {
        this.toastr.success('Profil mis à jour avec succès');
        this.confirmPassword = '';  // Réinitialiser le champ de confirmation du mot de passe
      },
      (error) => {
        this.toastr.error("Erreur lors de la mise à jour");
      }
    );
}
}