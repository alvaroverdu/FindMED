import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonsModule } from '../../commons/commons.module';

import { CursosComponent } from './cursos/cursos.component';
import { CursoComponent } from './curso/curso.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { AsignaturaComponent } from './asignatura/asignatura.component';
import { GruposComponent } from './grupos/grupos.component';
import { GrupoComponent } from './grupo/grupo.component';
import { SintomasComponent } from './sintomas/sintomas.component';
import { SintomaComponent } from './sintoma/sintoma.component';
import { EnfermedadesComponent } from './enfermedades/enfermedades.component';
import { EnfermedadComponent } from './enfermedad/enfermedad.component';
import { CentrosComponent } from './centros/centros.component';
import { CentroComponent } from './centro/centro.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    DashboardComponent,
    CursosComponent,
    CursoComponent,
    UsuariosComponent,
    UsuarioComponent,
    AsignaturasComponent,
    AsignaturaComponent,
    GruposComponent,
    GrupoComponent,
    SintomasComponent,
    SintomaComponent,
    EnfermedadesComponent,
    EnfermedadComponent,
    CentrosComponent,
    CentroComponent,

  ],
  exports: [
    CursosComponent,
    CursoComponent,
    UsuariosComponent,
    UsuarioComponent,
    DashboardComponent,
    AsignaturasComponent,
    AsignaturaComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule

  ]
})
export class AdminModule { }
