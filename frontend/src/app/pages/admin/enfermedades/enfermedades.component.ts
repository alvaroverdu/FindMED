import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { Enfermedad } from '../../../models/enfermedad.model';
import { Sintoma } from 'src/app/models/sintoma.model';
import { UsuarioService } from '../../../services/usuario.service';
import { SintomaService } from '../../../services/sintoma.service';
import { EnfermedadService } from '../../../services/enfermedad.service';


@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.css']
})
export class EnfermedadesComponent implements OnInit {

 // Control de paginación
 public totalregistros: number = 0;
 public registroactual: number = 0;
 public registrosporpagina: number = environment.registros_por_pagina;
 // Control del loading
 public loading = false;
 // Sintomas lsitado
 public listaRegistros: Enfermedad[] = [];
 // Ultima búsqueda
 public ultimaBusqueda = '';
 
 public sintomas: Sintoma[] = [];


 constructor( private usuarioService: UsuarioService,
              private sintomaService: SintomaService,
              private enfermedadService: EnfermedadService) { }

 ngOnInit(): void {
   this.cargarEnfermedades(this.ultimaBusqueda);
 }

 cargarEnfermedades( texto: string ) {
   this.ultimaBusqueda = texto;
   this.loading = true;
   this.enfermedadService.cargarEnfermedades(this.registroactual, texto)
     .subscribe(res => {
       if (res['enfermedades'].length === 0) {
         if (this.registroactual > 0) {
           this.registroactual -= this.registrosporpagina;
           if (this.registroactual < 0) { this.registroactual = 0};
           this.cargarEnfermedades(this.ultimaBusqueda);
         } else {
           this.listaRegistros = [];
           this.totalregistros = 0;
         }
       } else {
         this.listaRegistros = res['enfermedades'];
         this.totalregistros = res['page'].total;
       }
       this.loading = false;
     }, (err)=> {
       Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo', });
       this.loading = false;
     });
 }

 cargarSintomas() {
  // cargamos todos los cursos
  this.sintomaService.cargarSintomas(0, '','todos')
    .subscribe( res => {
      this.sintomas = res['sintomas'];
    });
}


 cambiarPagina( pagina: number) {
   pagina = (pagina < 0 ? 0 : pagina);
   this.registroactual = ((pagina - 1) * this.registrosporpagina >=0 ? (pagina - 1) * this.registrosporpagina : 0);
   this.cargarEnfermedades(this.ultimaBusqueda);
 }

 eliminarEnfermedades( uid: string, nombre: string) {
   // Solo los admin pueden borrar usuarios
   if (this.usuarioService.rol !== 'ROL_ADMIN') {
     Swal.fire({icon: 'warning', title: 'Oops...', text: 'No tienes permisos para realizar esta acción',});
     return;
   }

   Swal.fire({
     title: 'Eliminar enfermedad',
     text: `Al eliminar la enfermedad '${nombre}' se perderán todos los datos asociados. ¿Desea continuar?`,
     icon: 'question',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, borrar'
   }).then((result) => {
         if (result.value) {
           this.enfermedadService.eliminarEnfermedades(uid)
             .subscribe( resp => {
               this.cargarEnfermedades(this.ultimaBusqueda);
             }
             ,(err) =>{
               Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
             })
         }
     });
 }

 mostrarSintomas(sintomas: Array<Sintoma>){
    let sintomasString = '';
    sintomas.forEach(sintoma => {
      sintomasString += sintoma.nombre + ', ';
    });
    return sintomasString.substring(0, sintomasString.length - 2);
    
 }

}
