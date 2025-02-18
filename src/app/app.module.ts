import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';

import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

import { MapsComponent } from './pages/admin/maps/maps.component';
import { TablesComponent } from './pages/admin/tables/tables.component';
import { UserProfileComponent } from './pages/admin/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';


import { RegisterComponent } from './pages/register/register.component';

import { ComponentsModule } from './components/components.module';

import { BrowserModule } from '@angular/platform-browser';
import { IndexComponent } from './pages/index/index.component';
import { DachbordMComponent } from './pages/manager/dachbord-m/dachbord-m.component';
import { ProfileComponent } from './pages/manager/profile/profile.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ManagerCrudComponent } from './pages/admin/manager-crud/manager-crud.component';


import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  imports: [  NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,  AppRoutingModule, BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
   // Déclarez le composant ici
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  declarations: [ AppComponent, 
    AdminLayoutComponent,
    AuthLayoutComponent,
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    LoginComponent,
    MapsComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    DachbordMComponent,
    ProfileComponent,
    ManagerLayoutComponent,
    ManagerCrudComponent ,
    RegisterComponent,
     


 


  
   
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
