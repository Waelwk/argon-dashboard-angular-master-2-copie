import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isCabinet: boolean = false;
  authService: any;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      typeUtilisateur: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      cabinetNom: [''],
      cabinetAdresse: [''],
      cabinetTelephone: ['']
    });
  }

  onTypeChange(event: any) {
    this.isCabinet = event.target.value === 'cabinet';

    if (this.isCabinet) {
      this.registerForm.get('cabinetNom')?.setValidators([Validators.required]);
      this.registerForm.get('cabinetAdresse')?.setValidators([Validators.required]);
      this.registerForm.get('cabinetTelephone')?.setValidators([Validators.required]);
    } else {
      this.registerForm.get('cabinetNom')?.clearValidators();
      this.registerForm.get('cabinetAdresse')?.clearValidators();
      this.registerForm.get('cabinetTelephone')?.clearValidators();
    }

    this.registerForm.get('cabinetNom')?.updateValueAndValidity();
    this.registerForm.get('cabinetAdresse')?.updateValueAndValidity();
    this.registerForm.get('cabinetTelephone')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    const formData = this.registerForm.value;

    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    if (this.isCabinet) {
      const cabinetData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
        cabinet: {
          nom: formData.cabinetNom,
          adresse: formData.cabinetAdresse,
          telephone: formData.cabinetTelephone
        }
      };

      this.authService.registerCabinet(cabinetData).subscribe(() => {
        alert('Cabinet créé avec succès.');
        this.router.navigate(['/login']);
      });
    } else {
      const clientData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password
      };

      this.authService.registerClient(clientData).subscribe(() => {
        alert('Client créé avec succès.');
        this.router.navigate(['/login']);
      });
    }
  }
}
