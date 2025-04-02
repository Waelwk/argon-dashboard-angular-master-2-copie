import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isCabinet: boolean = false;
  loading: boolean = false;
  errorMessage: string = ''; // Variable pour les messages d'erreur
  successMessage: string = ''; // Variable pour les messages de succès
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      typeUtilisateur: ['', Validators.required], // Client ou Cabinet
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      nomCabinet: [''],
      adresse: [''],
      numTel: [''],
      emailC: ['', Validators.email], 
    });
  }

  onTypeChange(event: any) {
    this.isCabinet = event.target.value === 'cabinet';
  
    if (this.isCabinet) {
      this.registerForm.get('emailC')?.setValidators([Validators.required, Validators.email]);
      this.registerForm.get('nomCabinet')?.setValidators([Validators.required]);
      this.registerForm.get('adresse')?.setValidators([Validators.required]);
      this.registerForm.get('numTel')?.setValidators([Validators.required]);
    } else {
      this.registerForm.get('emailC')?.clearValidators();
      this.registerForm.get('nomCabinet')?.clearValidators();
      this.registerForm.get('adresse')?.clearValidators();
      this.registerForm.get('numTel')?.clearValidators();
      
      // 🚀 Met à jour les valeurs pour éviter qu'elles soient nulles
      this.registerForm.patchValue({
        nomCabinet: '',
        adresse: '',
        numTel: '',
        emailC: '',
      });
    }
  
    // Appliquer les changements de validation
    this.registerForm.get('nomCabinet')?.updateValueAndValidity();
    this.registerForm.get('adresse')?.updateValueAndValidity();
    this.registerForm.get('numTel')?.updateValueAndValidity();
    this.registerForm.get('emailC')?.updateValueAndValidity();
  }
  
  onSubmit() {
    this.errorMessage = ''; // Réinitialiser le message d'erreur
    this.successMessage = ''; // Réinitialiser le message de succès
  
    if (this.registerForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      return;
    }
  
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.loading = true;

    if (this.isCabinet) {
      // Création d'un manager et d'un cabinet
      const cabinetData = {
        firstname: this.registerForm.value.prenom,
        lastname: this.registerForm.value.nom,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        emailC: this.registerForm.value.emailC, 
          nomCabinet: this.registerForm.value.nomCabinet,
          adresse: this.registerForm.value.adresse,
          numTel: this.registerForm.value.numTel,
        
      };    console.log("📢 Données envoyées à l'API :", cabinetData); 

      this.authService.registerCabinet(cabinetData).subscribe({
 

          next: (response) => {
           
            this.successMessage = response.message;  // "Manager et Cabinet créés. Vérifiez votre email pour activer votre compte."
            this.successMessage = 'Cabinet et Manager créés avec succès.';
            this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.errorMessage = 'Erreur: ' + err.error.message;  // Gérer l'erreur et afficher le message
          this.loading = false;
        },
      });

    } else {
      // Création d'un client simple
      const clientData = {
        role: 'CLIENT',
        firstname: this.registerForm.value.prenom,
        lastname: this.registerForm.value.nom,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.authService.registerClient(clientData).subscribe({
        next: () => {
          this.successMessage = 'Client créé avec succès.';
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.errorMessage = 'Erreur: ' + err.error.message;
          this.loading = false;
        },
      });
    }
  }
}
