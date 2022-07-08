import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage/mainpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoEnfermedadComponent } from './info-enfermedad/info-enfermedad.component';
import { InfoSintomaComponent } from './info-sintoma/info-sintoma.component';
import { InfoCentroComponent } from './info-centro/info-centro.component';




@NgModule({
  declarations: [MainpageComponent, InfoEnfermedadComponent, InfoSintomaComponent, InfoCentroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsuarioModule { }
