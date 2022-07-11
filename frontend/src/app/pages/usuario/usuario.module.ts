import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage/mainpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PerfilComponent } from './perfil/perfil.component';
import { InfoEnfermedadComponent } from './info-enfermedad/info-enfermedad.component';
import { InfoSintomaComponent } from './info-sintoma/info-sintoma.component';
import { InfoCentroComponent } from './info-centro/info-centro.component';
import { BiblioSintomasComponent } from './biblio-sintomas/biblio-sintomas.component';
import { BiblioEnfermedadesComponent } from './biblio-enfermedades/biblio-enfermedades.component';
import { BiblioCentrosComponent } from './biblio-centros/biblio-centros.component';





@NgModule({
  declarations: [MainpageComponent, InfoEnfermedadComponent, InfoSintomaComponent, InfoCentroComponent, BiblioSintomasComponent, BiblioEnfermedadesComponent, BiblioCentrosComponent,PerfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class UsuarioModule { }
