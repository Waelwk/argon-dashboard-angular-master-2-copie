import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';

import { DashboardComponent } from 'src/app/pages/admin/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/pages/admin/user-profile/user-profile.component';
import { TablesComponent } from 'src/app/pages/admin/tables/tables.component';
import { MapsComponent } from 'src/app/pages/admin/maps/maps.component';

import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { IndexComponent } from './pages/index/index.component';
import { DachbordMComponent } from './pages/manager/dachbord-m/dachbord-m.component';
import { ProfileComponent } from './pages/manager/profile/profile.component';

import { AuthGuard } from './guards/auth.guard';
import { ManagerCrudComponent } from './pages/admin/manager-crud/manager-crud.component';
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
import { DossierJuridiqueUpdate } from './Models/DossierJuridiqueUpdate';
import { DossierJuridiqueUpdateComponent } from './pages/Avocat/dossier-juridique-update/dossier-juridique-update.component';
import { AgendaComponent } from './pages/Avocat/agenda/agenda.component';
import { C } from '@fullcalendar/core/internal-common';
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
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { EditProfileManagerComponent } from './pages/manager/edit-profile-manager/edit-profile-manager.component';
import { EditProfilClientComponent } from './pages/Client/edit-profil-client/edit-profil-client.component';
import { EditProfilAvocatComponent } from './pages/Avocat/edit-profil-avocat/edit-profil-avocat.component';
import { EditProfilAssistantComponent } from './pages/Assistant/edit-profil-assistant/edit-profil-assistant.component';
import { ChatComponent } from './pages/Avocat/messaging/chat/chat.component';
import { ChatAComponent } from './pages/Assistant/chat-a/chat-a.component';
import { ChatMComponent } from './pages/manager/chat-m/chat-m.component';
import { ChatAdComponent } from './pages/admin/chat-ad/chat-ad.component';
import { ChatCComponent } from './pages/Client/chat-c/chat-c.component';
import { BlogAComponent } from './pages/Avocat/blog-a/blog-a.component';
import { BlogComponent } from './pages/admin/blog/blog.component';
import { BlogPubComponent } from './pages/blog-pub/blog-pub.component';
import { DossierArchiverComponent } from './pages/Avocat/dossier-archiver/dossier-archiver.component';
import { ChatbotPdfManagerComponent } from './pages/admin/chatbot-pdf-manager/chatbot-pdf-manager.component';
import { CabinetListComponent } from './pages/cabinet-list/cabinet-list.component';



const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
  },
  { path: 'Chatboot', component: ChatbotComponent }, 
  { path: 'Pub', component:BlogPubComponent},
  {
    path: 'dashboardm',
    component: ManagerLayoutComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['MANAGER'] },
    children: [
      { path: '', component: DachbordMComponent },
 
      { path: 'profile', component: ProfileComponent },
      
      { path: 'cabinet', component: CabinetMComponent},
      { path: 'listeAvocatM/:id', component: ListeAvocatCabinetMComponent}, 
      { path: 'listeAssistant/:id', component: ListeAssistatnCabinetComponent},
      { path: 'AssistantArchivee/:id', component:  ListeAssistatnCabinetAComponent},
      { path: 'AvocatArchivee/:id', component: ListeAvocatCabinetAComponent},
      { path: 'DossierJuridique/:id',  component: ListedossierMComponent },
      { path: 'EditProfile', component: EditProfileManagerComponent},
      { path: 'chat', component:   ChatMComponent},
    ]
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'listeAvocat/:id', component: ListeAvocatCabinetComponent },
      { path: 'Cabinet', component: CabinetComponent },
      { path: 'Manager', component:ManagerCrudComponent  },
      { path: 'Client', component: ClientComponent },
      { path:'ClientArchivee', component: ClientArchiveeComponent },
      { path: 'listeAssistant/:id', component: ListeAssistantComponent},
      { path: 'cabinetinfo/:id', component:  CabinetInfoComponent},
      { path: 'AssistantArchivee/:id', component:  ListeAssistantArchiveeComponent},
      { path: 'AvocatArchivee/:id', component: ListeAvocatArchiveeComponent},
      { path: 'ManagerArchivee', component: ManagerArchiveeComponent},
      { path: 'DossierJuridique/:id',  component: ListedossierMComponent },
      { path: 'chat', component:  ChatAdComponent},
      { path: 'Blog', component:  BlogComponent},
 
          { path: 'ChatbotManager', component:ChatbotPdfManagerComponent},
    ]
  },
  {
    path: 'dashboardA',
    component: AvocatLayoutComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['AVOCAT'] },
    children: [
      { path: 'Dossier', component: ListedossierAvocatComponent },
      { path: 'dj/:id', component: DossierJuridiqueUpdateComponent },
      { path: 'agenda', component:AgendaComponent },
      { path: 'EditProfil', component:  EditProfilAvocatComponent},
      { path: 'chat', component:  ChatComponent},
         { path: 'Blog', component: BlogAComponent},
         { path: 'DossierCloture', component:      DossierArchiverComponent},
    ]
  },
  {
     path: 'dashboardAssistant',
    component: AssistantLayoutComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['ASSISTANT'] },
    children: [

      { path: 'Dossier/:id', component: ListeDossierAvocatAssistantComponent},
      { path: 'dj/:id', component: DossierUpdateAssistantComponent},
      { path: 'agendaa', component:AgendaCabinetAssistantComponent},
      { path: 'Avocat', component: LissteAvocatCabinetComponent },
      { path: 'EditProfil', component: EditProfilAssistantComponent},
      { path: 'chat', component:   ChatAComponent},
    ]
  },
  {
    path: 'dashboardClient',
    component: ClientLayoutComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['CLIENT'] },
    children: [
      { path: 'Dossier', component: ListeDossierClientComponent },
      { path: 'dj/:id', component: DossierUpdateClientComponent },
      { path: 'agenda', component: AgendaClientComponent},
      { path: 'EditProfil', component: EditProfilClientComponent},
      { path: 'chat', component:  ChatCComponent},
    
    
    ]
  },
  { path: 'index', component: IndexComponent },
  { path: 'Blog', component:BlogPubComponent},
  { path: 'cabinets', component: CabinetListComponent },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'resetPasword', component:ResetPasswordComponent },
    
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
