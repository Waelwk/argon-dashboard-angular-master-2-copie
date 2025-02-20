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


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboardm',
    component: ManagerLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['MANAGER'] },
    children: [
      { path: '', component: DachbordMComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'tables', component: CabinetComponent },
      { path: 'maps', component: ManagerCrudComponent },
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
