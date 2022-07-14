import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Enfermedad } from 'src/app/models/enfermedad.model';
import { Sintoma } from 'src/app/models/sintoma.model';
import { EnfermedadService } from 'src/app/services/enfermedad.service';



@Component({
  selector: 'app-guardar-busqueda',
  templateUrl: './guardar-busqueda.component.html',
  styleUrls: ['./guardar-busqueda.component.css']
})
export class GuardarBusquedaComponent implements OnInit {

  public favoritos = this.usuarioService.enfermedades;
  public todasEnfermedades: Enfermedad[] = [];
  public mostrarEnfermedades: Enfermedad[] = [];

  constructor( private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private enfermedadService: EnfermedadService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.favoritos);
    this.cargarEnfermedades();
    console.log(this.mostrarEnfermedades);
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

 cargarEnfermedades() {
  // cargamos todos las enfermedades
  this.enfermedadService.cargarEnfermedades(0, '','todos')
    .subscribe( res => {
      this.todasEnfermedades = res['enfermedades'];
      this.favoritos.forEach(enfermedad => {
        this.todasEnfermedades.forEach(enfermedad2 => {
          if(enfermedad.nombre === enfermedad2.nombre){
            this.mostrarEnfermedades.push(enfermedad2);
          }
        });
      });
    });
}



}
