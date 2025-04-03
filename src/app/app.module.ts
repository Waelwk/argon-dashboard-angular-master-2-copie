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
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CabinetComponent } from './pages/admin/cabinet/cabinet.component';
import { ListeAvocatCabinetComponent } from './pages/admin/liste-avocat-cabinet/liste-avocat-cabinet.component';
import { ListeAssistantComponent } from './pages/admin/liste-assistant/liste-assistant.component';
import { CabinetInfoComponent } from './pages/admin/cabinet-info/cabinet-info.component';
import { ListeAssistantArchiveeComponent } from './pages/admin/liste-assistant-archivee/liste-assistant-archivee.component';
import { ListeAvocatArchiveeComponent } from './pages/admin/liste-avocat-archivee/liste-avocat-archivee.component';
import { ManagerArchiveeComponent } from './pages/admin/manager-archivee/manager-archivee.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CabinetMComponent } from './pages/manager/cabinet/cabinet.component';
import { ListeAvocatCabinetMComponent } from './pages/manager/liste-avocat-cabinet-m/liste-avocat-cabinet-m.component';
import { ListeAvocatCabinetAComponent } from './pages/manager/liste-avocat-cabinet-a/liste-avocat-cabinet-a.component';
import { ListeAssistatnCabinetComponent } from './pages/manager/liste-assistatn-cabinet/liste-assistatn-cabinet.component';
import { ListeAssistatnCabinetAComponent } from './pages/manager/liste-assistatn-cabinet-a/liste-assistatn-cabinet-a.component';

import { ListedossierMComponent } from './pages/manager/listedossier-m/listedossier-m.component';
import { AvocatLayoutComponent } from './layouts/avocat-layout/avocat-layout.component';
import { ListedossierAvocatComponent } from './pages/Avocat/listedossier-avocat/listedossier-avocat.component';
import { DossierJuridiqueComponent } from './pages/admin/dossier-juridique/dossier-juridique.component';
import { DossierJuridiqueUpdateComponent } from './pages/Avocat/dossier-juridique-update/dossier-juridique-update.component';
import { registerLocaleData } from '@angular/common';

// import { FullCalendarModule } from '@fullcalendar/angular';
import localeFr from '@angular/common/locales/fr';
import { ToastrModule } from 'ngx-toastr';
import { AgendaComponent } from './pages/Avocat/agenda/agenda.component';


import { FullCalendarModule } from '@fullcalendar/angular';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ListeDossierClientComponent } from './pages/Client/liste-dossier-client/liste-dossier-client.component';
import { DossierUpdateClientComponent } from './pages/Client/dossier-update-client/dossier-update-client.component';
import { AgendaClientComponent } from './pages/Client/agenda-client/agenda-client.component';
import { AssistantLayoutComponent } from './layouts/assistant-layout/assistant-layout.component';
import { LissteAvocatCabinetComponent } from './pages/Assistant/lisste-avocat-cabinet/lisste-avocat-cabinet.component';
import { ListeDossierAvocatAssistantComponent } from './pages/Assistant/liste-dossier-avocat-assistant/liste-dossier-avocat-assistant.component';
import { DossierUpdateAssistantComponent } from './pages/Assistant/dossier-update-assistant/dossier-update-assistant.component';
import { AgendaCabinetAssistantComponent } from './pages/Assistant/agenda-cabinet-assistant/agenda-cabinet-assistant.component';
import { ClientComponent } from './pages/admin/client/client.component';
import { ClientArchiveeComponent } from './pages/admin/client-archivee/client-archivee.component';

registerLocaleData(localeFr); 


@NgModule({
  imports: [ 
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
    FullCalendarModule ,
    BrowserAnimationsModule, // Nécessaire pour ngx-toastr
    ToastrModule.forRoot(),
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
    MatToolbarModule,
    MatTableModule,
    MatCardModule,

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
     CabinetComponent,
     ListeAssistantComponent,

   ListeAvocatCabinetComponent,
  CabinetInfoComponent,
  ListeAssistantArchiveeComponent,
  ListeAvocatArchiveeComponent,
  ManagerArchiveeComponent,
  ResetPasswordComponent,
 CabinetMComponent,
 ListeAvocatCabinetMComponent,
 ListeAvocatCabinetAComponent,
 ListeAssistatnCabinetAComponent,
 ListeAssistatnCabinetComponent,
 DossierJuridiqueComponent,
 ListedossierMComponent,


  AvocatLayoutComponent,
  ListedossierAvocatComponent,
  DossierJuridiqueUpdateComponent,
  AgendaComponent,
  ClientLayoutComponent,
  ListeDossierClientComponent,
  DossierUpdateClientComponent,
  AgendaClientComponent,
  AssistantLayoutComponent,
  LissteAvocatCabinetComponent,
  ListeDossierAvocatAssistantComponent,
  DossierUpdateAssistantComponent,
  AgendaCabinetAssistantComponent,
  ManagerCrudComponent,
  ClientComponent,
  ClientArchiveeComponent 
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
