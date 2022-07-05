import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { SintomaService } from 'src/app/services/sintoma.service';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { Sintoma } from 'src/app/models/sintoma.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Enfermedad } from 'src/app/models/enfermedad.model';


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


  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private sintomaService: SintomaService,
    private enfermedadService: EnfermedadService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarSintomas();
    this.cargarEnfermedades();


  }


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



}
