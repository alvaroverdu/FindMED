import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Curso } from '../../../models/curso.model';
import { CursoService } from '../../../services/curso.service';
import Swal from 'sweetalert2';
import { Sintoma } from '../../../models/sintoma.model';
import { UsuarioService } from '../../../services/usuario.service';
import { SintomaService } from '../../../services/sintoma.service';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent implements OnInit {

  // Control de paginación
  public totalregistros: number = 0;
  public registroactual: number = 0;
  public registrosporpagina: number = environment.registros_por_pagina;
  // Control del loading
  public loading = false;
  // Sintomas lsitado
  public listaRegistros: Sintoma[] = [];
  // Ultima búsqueda
  public ultimaBusqueda = '';
  

  constructor( private cursoService: CursoService,
               private usuarioService: UsuarioService,
               private sintomaService: SintomaService) { }

  ngOnInit(): void {
    this.cargarSintomas(this.ultimaBusqueda);
  }

  cargarSintomas( texto: string ) {
    this.ultimaBusqueda = texto;
    this.loading = true;
    this.sintomaService.cargarSintomas(this.registroactual, texto)
      .subscribe(res => {
        if (res['sintomas'].length === 0) {
          if (this.registroactual > 0) {
            this.registroactual -= this.registrosporpagina;
            if (this.registroactual < 0) { this.registroactual = 0};
            this.cargarSintomas(this.ultimaBusqueda);
          } else {
            this.listaRegistros = [];
            this.totalregistros = 0;
          }
        } else {
          this.listaRegistros = res['sintomas'];
          this.totalregistros = res['page'].total;
        }
        this.loading = false;
      }, (err)=> {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo', });
        this.loading = false;
      });
  }

  cambiarPagina( pagina: number) {
    pagina = (pagina < 0 ? 0 : pagina);
    this.registroactual = ((pagina - 1) * this.registrosporpagina >=0 ? (pagina - 1) * this.registrosporpagina : 0);
    this.cargarSintomas(this.ultimaBusqueda);
  }

  eliminarSintoma( uid: string, nombre: string) {
    // Solo los admin pueden borrar usuarios
    if (this.usuarioService.rol !== 'ROL_ADMIN') {
      Swal.fire({icon: 'warning', title: 'Oops...', text: 'No tienes permisos para realizar esta acción',});
      return;
    }

    Swal.fire({
      title: 'Eliminar sintoma',
      text: `Al eliminar el sintoma '${nombre}' se perderán todos los datos asociados. ¿Desea continuar?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
          if (result.value) {
            this.sintomaService.eliminarSintoma(uid)
              .subscribe( resp => {
                this.cargarSintomas(this.ultimaBusqueda);
              }
              ,(err) =>{
                Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
              })
          }
      });
  }
}
