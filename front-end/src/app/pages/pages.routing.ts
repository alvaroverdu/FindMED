import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { UsuarioLayoutComponent } from '../layouts/usuario-layout/usuario-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminLayoutComponent,
    children: [
    { path: '', component: DashboardComponent},
    { path: 'usuarios', component: UsuariosComponent},
    { path: '**', redirectTo: ''}
  ]},

  { path: 'usuario', component: UsuarioLayoutComponent,
    children: [
      { path: '**', redirectTo: ''}
  ]},
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
