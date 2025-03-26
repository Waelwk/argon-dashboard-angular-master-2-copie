import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbardachComponent } from './navbardach/navbardach.component';
import { NavbarindexComponent } from './navbarindex/navbarindex.component';
import { sidebarm } from './sidebarM/sidebarm.component';
import { SideBarAComponent } from './side-bar-a/side-bar-a.component';
import { SidebarClientComponent } from './sidebar-client/sidebar-client.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbardachComponent,
    SidebarComponent,
NavbarindexComponent,
sidebarm,
SideBarAComponent,
SidebarClientComponent
  ],
  exports: [
    FooterComponent,
    NavbardachComponent,
    SidebarComponent,
    NavbarindexComponent,sidebarm,SideBarAComponent,SidebarClientComponent 
  ]
})
export class ComponentsModule { }
