import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage/mainpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoEnfermedadComponent } from './info-enfermedad/info-enfermedad.component';




@NgModule({
  declarations: [MainpageComponent, InfoEnfermedadComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsuarioModule { }
