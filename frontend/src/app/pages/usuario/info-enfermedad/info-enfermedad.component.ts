import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SintomaService } from '../../../services/sintoma.service';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Enfermedad } from 'src/app/models/enfermedad.model';
import { Sintoma } from 'src/app/models/sintoma.model';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosComponent } from '../../admin/usuarios/usuarios.component';

@Component({
  selector: 'app-info-enfermedad',
  templateUrl: './info-enfermedad.component.html',
  styleUrls: ['./info-enfermedad.component.css']
})
export class InfoEnfermedadComponent implements OnInit {

  public enfermedad: Enfermedad;
  public uidEnfermedad: string = '';

  public cargando: boolean = false;

  constructor(private fb: FormBuilder,
    private enfermedadService: EnfermedadService,
    private usuarioService: UsuarioService,
    private sintomaService: SintomaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.uidEnfermedad = this.route.snapshot.params['uid'];
    this.cargarEnfermedad(this.uidEnfermedad);
  }


  cargarEnfermedad(uidEnfermedad){
    this.cargando = true;
    this.enfermedadService.cargarEnfermedad(uidEnfermedad)
      .subscribe(res => {
        this.cargando = false;
        this.enfermedad = res['enfermedades'];
      }, (err) => {
        this.cargando = false;
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        return;
      }	);	
  }


  mostrarSintomas(sintomas: Array<Sintoma>){
    let sintomasString = '';
    sintomas.forEach(sintoma => {
      sintomasString += sintoma.nombre + ', ';
    });
    return sintomasString.substring(0, sintomasString.length - 2);
    
  }

 irAlSintoma(uidSintoma:string){
    
  this.router.navigateByUrl('/usuario/info-sintoma/' + uidSintoma);

 }

 anyadirFav(){
  console.log('Funciona');
  console.log(this.usuarioService.uid);
  this.usuarioService.cargarUsuario(this.usuarioService.uid).subscribe(res => {
    let usuario = new Usuario (res['usuarios'].uid,res['usuarios'].rol,res['usuarios'].nombre, res['usuarios'].email, res['usuarios'].edad,res['usuarios'].ubicacion,res['usuarios'].enfermedades,res['usuarios'].alta,res['usuarios'].activo);
    usuario.enfermedades.push(this.enfermedad);
    console.log('Enfermedad',this.enfermedad);
    console.log('Usuario',usuario.enfermedades);
    this.usuarioService.actualizarUsuario(this.usuarioService.uid,usuario).subscribe(res => {
      console.log(res);
      Swal.fire({icon: 'success', title: 'Éxito', text: 'Se ha añadido a favoritos',});
    });
  });
 }

 quitarFav(){
  console.log('Funciona');
  console.log(this.usuarioService.uid);
  this.usuarioService.cargarUsuario(this.usuarioService.uid).subscribe(res => {
    let usuario = new Usuario (res['usuarios'].uid,res['usuarios'].rol,res['usuarios'].nombre, res['usuarios'].email, res['usuarios'].edad,res['usuarios'].ubicacion,res['usuarios'].enfermedades,res['usuarios'].alta,res['usuarios'].activo);
    usuario.enfermedades.forEach((enfermedad,index) => {
      console.log(this.enfermedad.nombre);
      if(enfermedad.nombre == this.enfermedad.nombre){
      usuario.enfermedades.splice(index,1);
      }
    });
    console.log('Usuario',usuario.enfermedades);
    this.usuarioService.actualizarUsuario(this.usuarioService.uid,usuario).subscribe(res => {
      console.log(res);
      Swal.fire({icon: 'success', title: 'Éxito', text: 'Se ha quitado de favoritos',});
    });
  });
 }


esFavorito(){
  if(this.usuarioService.enfermedades.find(enfermedad => enfermedad.nombre == this.enfermedad.nombre)){
    return true;
  }
  return false;
}



  
  
 }




