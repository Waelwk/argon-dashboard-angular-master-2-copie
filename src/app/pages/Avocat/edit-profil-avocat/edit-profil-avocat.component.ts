import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Avocat } from 'src/app/Models/avocat';
import { AvocatService } from 'src/app/service/Avocat/avocat.service';

@Component({
  selector: 'app-edit-profil-avocat',
  templateUrl: './edit-profil-avocat.component.html',
  styleUrls: ['./edit-profil-avocat.component.css']
})
export class EditProfilAvocatComponent implements OnInit {

  avocat: Avocat;  // Propriété pour stocker les données de l'avocat
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;
  avocatId: number
  constructor(
    private avocatService: AvocatService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
 this.avocatId = Number(localStorage.getItem('id')); // Récupérer l'ID de l'avocat depuis le localStorage
    if (this.avocatId) {
      this.avocatService.getAvocatById(this.avocatId).subscribe(
        (data: Avocat) => {
          this.avocat = data;
          this.avocat.password = ''; 
          console.log('Données de l\'avocat récupérées:', this.avocat);
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'avocat', error);
          this.toastr.error('Erreur lors de la récupération de l\'avocat');
        }
      );
    }
  }

  // Méthode pour mettre à jour les informations de l'avocat
  updateAvocat(): void {
    // Vérification si les mots de passe correspondent
    if (this.avocat.password && this.avocat.password !== this.confirmPassword) {
      this.toastr.error('Les mots de passe ne correspondent pas');
      return;
    }

    // Créer une copie de avocat pour envoyer la mise à jour
    const updatedAvocat = { ...this.avocat };

    // Ne pas envoyer le champ password s’il est vide
    if (!updatedAvocat.password || updatedAvocat.password.trim() === '') {
      delete updatedAvocat.password;
    }

    this.avocatService.updateAvocat(this.avocat.id, updatedAvocat).subscribe(
      () => {
        this.toastr.success('Avocat mis à jour avec succès');
        this.router.navigate(['/avocats']);  // Rediriger vers la liste des avocats après mise à jour
      },
      (error) => {
        this.toastr.error('Erreur lors de la mise à jour de l\'avocat');
      }
    );
  }

  // Annuler les modifications et revenir à la liste des avocats
  cancel(): void {
    this.router.navigate(['/avocats']);
  }
}