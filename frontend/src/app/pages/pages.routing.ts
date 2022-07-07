import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { UsuarioLayoutComponent } from '../layouts/usuario-layout/usuario-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { UsuarioComponent } from './admin/usuario/usuario.component';
import { DashboardprofComponent } from './prof/dashboardprof/dashboardprof.component';
import { DashboardaluComponent } from './alu/dashboardalu/dashboardalu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CursosComponent } from './admin/cursos/cursos.component';
import { CursoComponent } from './admin/curso/curso.component';
import { AsignaturasComponent } from './admin/asignaturas/asignaturas.component';
import { AsignaturaComponent } from './admin/asignatura/asignatura.component';
import { GruposComponent } from './admin/grupos/grupos.component';
import { GrupoComponent } from './admin/grupo/grupo.component';
import { AsignaturasprofComponent } from './prof/asignaturasprof/asignaturasprof.component';
import { AsignaturaprofComponent } from './prof/asignaturaprof/asignaturaprof.component';
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


/*
  /perfil                               [*]
  /admin/* --> páginas de administrador [ROL_ADMIN]
  /usuario/*   --> páginas de usuario        [ROL_USUARIO]

  data --> pasar informacion junto a la ruta para breadcrums y para AuthGuard {rol: 'ROL_ADMIN/ROL_PROFESOR/ROL_USUARIO/*'}

*/

const routes: Routes = [
  { path: 'perfil', component: AdminLayoutComponent, canActivate: [ AuthGuard ], data: {rol: '*'},
    children: [
      { path: '', component: PerfilComponent, data: { 
                                    titulo: 'Perfil',
                                    breadcrums: []
                                  },},
    ]},
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
    { path: 'cursos', component: CursosComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Cursos',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'cursos/curso/:uid', component: CursoComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Curso',
                                                        breadcrums: [ {titulo: 'Usuarios', url: '/admin/cursos'} ],
                                                      },},
    { path: 'asignaturas', component: AsignaturasComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Asignaturas',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'asignaturas/asignatura/:uid', component: AsignaturaComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Asignatura',
                                                        breadcrums: [ {titulo: 'Asignaturas', url: '/admin/asignaturas'} ],
                                                      },},
    { path: 'grupos', component: GruposComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Grupos',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'grupos/grupo/:uid', component: GrupoComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_ADMIN',
                                                        titulo: 'Grupo',
                                                        breadcrums: [ {titulo: 'Grupos', url: '/admin/grupos'} ],
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

  { path: 'prof', component: AdminLayoutComponent, canActivate: [ AuthGuard ], data: {rol: 'ROL_PROFESOR'},
    children: [
    { path: 'dashboard', component: DashboardprofComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_PROFESOR',
                                                        titulo: 'Dashboard Profesor',
                                                        breadcrums: []
                                                      },},
    { path: 'asignaturas', component: AsignaturasprofComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_PROFESOR',
                                                        titulo: 'Asignaturas - Items',
                                                        breadcrums: [ ],
                                                      },},
    { path: 'asignaturas/asignatura/:uid', component: AsignaturaprofComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol: 'ROL_PROFESOR',
                                                        titulo: 'Items',
                                                        breadcrums: [ {titulo: 'Asignaturas - Items', url: '/prof/asignaturas'} ],
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
    { path: 'info_enfermedad/:uid', component: InfoEnfermedadComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info enfermedades',
                                                        breadcrums: []
                                                      },},
    { path: 'info_sintoma', component: InfoSintomaComponent, canActivate: [ AuthGuard ], data: { 
                                                        rol:'ROL_USUARIO',
                                                        titulo: 'Info sintomas',
                                                        breadcrums: []
                                                      },},
    { path: '**', redirectTo: 'dashboard'}
  ]},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
