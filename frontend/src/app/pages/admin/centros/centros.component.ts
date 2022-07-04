import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { Enfermedad } from '../../../models/enfermedad.model';
import { Sintoma } from 'src/app/models/sintoma.model';
import { Centro } from 'src/app/models/centro.model';
import { UsuarioService } from '../../../services/usuario.service';
import { SintomaService } from '../../../services/sintoma.service';
import { CentroService } from 'src/app/services/centro.service';
import { EnfermedadService } from '../../../services/enfermedad.service';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

 // Control de paginación
 public totalregistros: number = 0;
 public registroactual: number = 0;
 public registrosporpagina: number = environment.registros_por_pagina;
 // Control del loading
 public loading = false;
 // Sintomas lsitado
 public listaRegistros: Centro[] = [];
 // Ultima búsqueda
 public ultimaBusqueda = '';
 
 public sintomas: Sintoma[] = [];
 public enfermedades: Enfermedad[] = [];



 constructor( private usuarioService: UsuarioService,
              private sintomaService: SintomaService,
              private centroService: CentroService,
              private enfermedadService: EnfermedadService) { }

 ngOnInit(): void {
   this.cargarCentros(this.ultimaBusqueda);
 }

 cargarCentros( texto: string ) {
   this.ultimaBusqueda = texto;
   this.loading = true;
   this.centroService.cargarCentros(this.registroactual, texto)
     .subscribe(res => {
       if (res['centros'].length === 0) {
         if (this.registroactual > 0) {
           this.registroactual -= this.registrosporpagina;
           if (this.registroactual < 0) { this.registroactual = 0};
           this.cargarCentros(this.ultimaBusqueda);
         } else {
           this.listaRegistros = [];
           this.totalregistros = 0;
         }
       } else {
         this.listaRegistros = res['centros'];
         this.totalregistros = res['page'].total;
       }
       this.loading = false;
     }, (err)=> {
       Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo', });
       this.loading = false;
     });
 }

 cargarEnfermedades() {
  // cargamos todos los cursos
  this.enfermedadService.cargarEnfermedades(0, '','todos')
    .subscribe( res => {
      this.enfermedades = res['enfermedades'];
    });
}


 cambiarPagina( pagina: number) {
   pagina = (pagina < 0 ? 0 : pagina);
   this.registroactual = ((pagina - 1) * this.registrosporpagina >=0 ? (pagina - 1) * this.registrosporpagina : 0);
   this.cargarCentros(this.ultimaBusqueda);
 }

 eliminarCentros( uid: string, nombre: string) {
   // Solo los admin pueden borrar usuarios
   if (this.usuarioService.rol !== 'ROL_ADMIN') {
     Swal.fire({icon: 'warning', title: 'Oops...', text: 'No tienes permisos para realizar esta acción',});
     return;
   }

   Swal.fire({
     title: 'Eliminar centro',
     text: `Al eliminar el centro '${nombre}' se perderán todos los datos asociados. ¿Desea continuar?`,
     icon: 'question',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, borrar'
   }).then((result) => {
         if (result.value) {
           this.centroService.eliminarCentros(uid)
             .subscribe( resp => {
               this.cargarCentros(this.ultimaBusqueda);
             }
             ,(err) =>{
               Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
             })
         }
     });
 }

 mostrarEnfermedades(enfermedades: Array<Enfermedad>){
  let enfermedadString = '';
  enfermedades.forEach(enfermedad => {
    enfermedadString += enfermedad.nombre + ', ';
  });
  return enfermedadString.substring(0, enfermedadString.length - 2);
  
}

}
