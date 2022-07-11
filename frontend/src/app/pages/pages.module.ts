import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

import { AdminModule } from './admin/admin.module';
import { AluModule } from './alu/alu.module';
import { ProfModule } from './prof/prof.module';
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
    AluModule,
    AdminModule,
    ProfModule,
    UsuarioModule,
    CommonsModule,
  ]
})
export class PagesModule { }
