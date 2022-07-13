import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { UsuarioLayoutComponent } from '../layouts/usuario-layout/usuario-layout.component';
import { InfoLayoutComponent } from '../layouts/info-layout/info-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { UsuarioComponent } from './admin/usuario/usuario.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { SintomasComponent } from './admin/sintomas/sintomas.component';
import { SintomaComponent } from './admin/sintoma/sintoma.component';
import { EnfermedadesComponent } from './admin/enfermedades/enfermedades.component';
import { EnfermedadComponent } from './admin/enfermedad/enfermedad.component';
import { CentrosComponent } from './admin/centros/centros.component';
import { CentroComponent } from './admin/centro/centro.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { MainpageComponent } from './usuario/mainpage/mainpage.component';
import { InfoEnfermedadComponent } from './usuario/info-enfermedad/info-enfermedad.component';
import { InfoSintomaComponent } from './usuario/info-sintoma/info-sintoma.component';
import { InfoCentroComponent } from './usuario/info-centro/info-centro.component';
import { BiblioSintomasComponent } from './usuario/biblio-sintomas/biblio-sintomas.component';
import { BiblioEnfermedadesComponent } from './usuario/biblio-enfermedades/biblio-enfermedades.component';
import { BiblioCentrosComponent } from './usuario/biblio-centros/biblio-centros.component';
import { GuardarBusquedaComponent } from './usuario/guardar-busqueda/guardar-busqueda.component';


/*
  /perfil                               [*]
  /admin/* --> páginas de administrador [ROL_ADMIN]
  /usuario/*   --> páginas de usuario        [ROL_USUARIO]

  data --> pasar informacion junto a la ruta para breadcrums y para AuthGuard {rol: 'ROL_ADMIN/ROL_USUARIO/*'}

*/

const routes: Routes = [

  { path: 'admin', component: AdminLayoutComponent, canActivate: [ AuthGuard], data: {rol: 'ROL_ADMIN'}, 
    children: [
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Dashboard Admin',
                                                        breadcrums: []
                                                      },},
    { path: 'usuarios', component: UsuariosComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Usuarios',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'usuarios/usuario/:uid', component: UsuarioComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Usuario',
                                                        breadcrums: [ {titulo: 'Usuarios', url: '/admin/usuarios'} ],
                                                      },},
    { path: 'sintomas', component: SintomasComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Sintomas',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'sintomas/sintoma/:uid', component: SintomaComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Sintoma',
                                                        breadcrums: [ {titulo: 'Sintomas', url: '/admin/sintomas'} ],
                                                      },},
    { path: 'enfermedades', component: EnfermedadesComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Enfermedades',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'enfermedades/enfermedad/:uid', component: EnfermedadComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Enfermedad',
                                                        breadcrums: [ {titulo: 'Enfermedades', url: '/admin/enfermedades'} ],
                                                      },},
    { path: 'centros', component: CentrosComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Centros',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'centros/centro/:uid', component: CentroComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Centro',
                                                        breadcrums: [ {titulo: 'Centros', url: '/admin/centros'} ],
                                                      },},
    { path: '**', redirectTo: 'dashboard'}

    
  ]},

  { path: 'usuario', component: UsuarioLayoutComponent, canActivate: [ AuthGuard ], data: {rol: 'ROL_USUARIO'}, 
    children: [
    { path: 'mainpage', component: MainpageComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Inicio Usuario',
                                                        breadcrums: []
                                                      },},
    { path: 'info-enfermedad/:uid', component: InfoEnfermedadComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info enfermedades',
                                                        breadcrums: []
                                                      },},
    { path: 'info-sintoma/:uid', component: InfoSintomaComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info sintomas',
                                                        breadcrums: []
                                                      },},
    { path: 'info-centro/:uid', component: InfoCentroComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info centros',
                                                        breadcrums: []
                                                      },},
    { path: 'perfil', component: PerfilComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info perfil',
                                                        breadcrums: []
                                                      },},
    { path: 'biblio-sintomas', component: BiblioSintomasComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info biblio sintomas',
                                                        breadcrums: []
                                                      },},
    { path: 'biblio-enfermedades', component: BiblioEnfermedadesComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info biblio enfermedades',
                                                        breadcrums: []
                                                      },},
    { path: 'biblio-centros', component: BiblioCentrosComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info biblio centros',
                                                        breadcrums: []
                                                      },},
    { path: 'favoritos', component: GuardarBusquedaComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info favoritos',
                                                        breadcrums: []
                                                      },},
    { path: '**', redirectTo: 'mainpage'}
  ]},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
