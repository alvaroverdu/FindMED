import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

import { AdminModule } from './admin/admin.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CommonsModule } from '../commons/commons.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
  ],
  exports: [
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    UsuarioModule,
    CommonsModule,
  ]
})
export class PagesModule { }
