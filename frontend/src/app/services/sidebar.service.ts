import { Injectable } from '@angular/core';
import { sidebarItem } from '../interfaces/sidebar.interface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuAdmin: sidebarItem[] =[
    { titulo: 'Dashboard Admin', icono: 'fa fa-tachometer-alt', sub: false, url: '/admin/dashboard'},
    { titulo: 'Gestión usuarios', icono: 'fa fa-users', sub: false, url: '/admin/usuarios'},
    { titulo: 'Gestión enfermedades', icono: 'fa fa-plus-square', sub: false, url: '/admin/enfermedades'},
    { titulo: 'Gestión sintomas', icono: 'fa fa-stethoscope', sub: false, url: '/admin/sintomas'},
    { titulo: 'Gestión centros', icono: 'fa fa-hospital', sub: false, url: '/admin/centros'},

  ];
  menuAlumno: sidebarItem[]=[
    { titulo: 'Dashboard Alumno', icono: 'fa fa-tachometer-alt', sub: false, url: '/alu/dashboard'},
  ];
  menuProfesor: sidebarItem[]=[
    { titulo: 'Dashboard Profesor', icono: 'fa fa-tachometer-alt', sub: false, url: '/prof/dashboard'},
    { titulo: 'Asignaturas - Items', icono: 'fa fa-copy', sub: false, url: '/prof/asignaturas'},
  ];
  none: sidebarItem[]=[
    { titulo: 'error', icono: 'fa fa-exclamation-triangle', sub: false, url: '/error'}
  ]
  constructor( private usuarioService: UsuarioService) { }

  getmenu() {
    
    switch (this.usuarioService.rol) {
      case 'ROL_ADMIN':
        return this.menuAdmin;
      case 'ROL_PROFESOR':
        return this.menuProfesor;
      case 'ROL_USUARIO':
        return this.menuAlumno;
    }

    return this.none;
  }
}
