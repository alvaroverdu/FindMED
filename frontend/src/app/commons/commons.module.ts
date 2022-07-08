import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { SelectusersComponent } from './selectusers/selectusers.component';
import { NavbaruserComponent } from './navbaruser/navbaruser.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PaginationComponent,
    ProgressbarComponent,
    SelectusersComponent,
    NavbaruserComponent,

  ],
  exports: [
    BreadcrumbComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PaginationComponent,
    ProgressbarComponent,
    SelectusersComponent,
    NavbaruserComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class CommonsModule { }
