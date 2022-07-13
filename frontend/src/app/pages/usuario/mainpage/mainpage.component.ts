import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { SintomaService } from 'src/app/services/sintoma.service';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { Sintoma } from 'src/app/models/sintoma.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Enfermedad } from 'src/app/models/enfermedad.model';
import {Location} from '@angular/common';



@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  public busquedaForm = this.fb.group({
    sintoma: ['', Validators.required ]
  });

  public sintomas: Sintoma[] = [];
  public enfermedades: Enfermedad[] = [];
  public listaenfermedadesposibles: Enfermedad[] = [];
  public buscado: boolean;


  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private sintomaService: SintomaService,
    private enfermedadService: EnfermedadService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarSintomas();
    this.cargarEnfermedades();
    this.buscado=false;

  }

/*
  buscar(){     
    this.listaenfermedadesposibles = [];
    this.enfermedades.forEach(enfermedad => {
      enfermedad.sintomas.forEach(sintoma => {
        if(sintoma.nombre.toLowerCase() === this.busquedaForm.get('sintoma').value.toLowerCase()){
          console.log(this.busquedaForm.get('sintoma').value.toLowerCase());
          this.listaenfermedadesposibles.push(enfermedad);
        }
      });
      console.log(this.listaenfermedadesposibles);
    });
    this.buscado=true;
  }
*/

  buscar2(){
    this.enfermedadService.cargarEnfermedad2(this.busquedaForm.get('sintoma').value)
      .subscribe(res => {
        if(this.busquedaForm.get('sintoma').value!=''){
        this.listaenfermedadesposibles = res['enfermedades'];
        }else{
          this.listaenfermedadesposibles = [];
        }
      });
      this.buscado=true;

  }

  cargarSintomas() {
    // cargamos todos los síntomas
    this.sintomaService.cargarSintomas(0, '', 'todos')
      .subscribe(res => {
        this.sintomas = res['sintomas'];
        console.log(res['sintomas']);
      });
  }

  cargarEnfermedades() {
    // cargamos todos las enfermedades
    this.enfermedadService.cargarEnfermedades(0, '','todos')
      .subscribe( res => {
        this.enfermedades = res['enfermedades'];
        console.log(this.enfermedades);
      });
  }
  
  mostrarPosiblesEnfermedades(){
    let enfermedadString = '';
    this.listaenfermedadesposibles.forEach(enfermedad => {
      enfermedadString += enfermedad.nombre + ', ';
    });
    return enfermedadString.substring(0, enfermedadString.length - 2);
    
  }

  comprobarEnfermedades(){
    if(this.listaenfermedadesposibles.length !== 0){
     return true;
    }
    else{
      return false;
    }
  }


  mostrarSintomas(sintomas: Array<Sintoma>){
    let sintomasString = '';
    sintomas.forEach(sintoma => {
      sintomasString += sintoma.nombre + ', ';
    });
    return sintomasString.substring(0, sintomasString.length - 2);
    
 }
 
 irAlaEnfermedad(enfermedad: String ){
  this.router.navigateByUrl('/usuario/info-enfermedad/' + enfermedad);
 }

 volver() {
  this.location.back();
}

}
