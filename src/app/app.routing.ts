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



const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboardm',
    component: ManagerLayoutComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ['MANAGER'] },
    children: [
      { path: '', component: DachbordMComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'ManagerArchivee', component: ManagerArchiveeComponent},
      { path: 'cabinet', component: CabinetMComponent},
      { path: 'listeAvocatM/:id', component: ListeAvocatCabinetMComponent}, 
      { path: 'listeAssistant/:id', component: ListeAssistatnCabinetComponent},
      { path: 'AssistantArchivee/:id', component:  ListeAssistatnCabinetAComponent},
      { path: 'AvocatArchivee/:id', component: ListeAvocatCabinetAComponent},
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
      { path: 'tables', component: CabinetComponent },
      { path: 'maps', component: ManagerCrudComponent },
      { path: 'listeAssistant/:id', component: ListeAssistantComponent},
      { path: 'cabinetinfo/:id', component:  CabinetInfoComponent},
      { path: 'AssistantArchivee/:id', component:  ListeAssistantArchiveeComponent},
      { path: 'AvocatArchivee/:id', component: ListeAvocatArchiveeComponent},
      { path: 'ManagerArchivee', component: ManagerArchiveeComponent},
    ]
  },
  { path: 'index', component: IndexComponent },
 
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
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
