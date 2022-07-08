import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public subs$: Subscription = new Subscription();
  public sendpass = false;
  public showOKP = false;
  public showOKD = false;

  public datosForm = this.fb.group({
    email: [ '', [Validators.required, Validators.email] ],
    nombre: ['', Validators.required ],
    edad: ['', Validators.required ],
    ubicacion: ['', Validators.required ],
  });

  public datosPassword = this.fb.group({
    password: ['', Validators.required],
    nuevopassword: ['', Validators.required],
    nuevopassword2: ['', Validators.required],
  })

  constructor( private usuarioService: UsuarioService,
               private fb: FormBuilder,
               private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  // Actualizar password
  cambiarPassword(): void {
    this.sendpass = true;
    this.showOKP = false;
    if (this.datosPassword.invalid || this.passwordNoIgual()) { return; }
    this.usuarioService.cambiarPassword( this.usuarioService.uid, this.datosPassword.value )
      .subscribe( res => {
        this.showOKP = true;
        this.datosPassword.markAsPristine();
      }, (err) => {
          const errtext = err.error.msg || 'No se pudo cambiar la contraseña';
          Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
          return;
        });

  }

  // Actualizar datos de usuario
  enviar(): void {
    if (this.datosForm.invalid) { return; }

    // Actualizamos los datos del formulario y si va bien actualizamos foto
    this.usuarioService.actualizarUsuario( this.usuarioService.uid, this.datosForm.value )
    .subscribe( res => {
      this.usuarioService.establecerdatos( res['usuario'].nombre,res['usuario'].email,res['usuario'].edad,res['usuario'].ubicacion );

      this.datosForm.markAsPristine(); // marcamos reiniciado de cambios
      this.showOKD = true;
    }, (err) => {
      const errtext = err.error.msg || 'No se pudo guardar los datos';
      Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
    });
  }  

  // Recupera los datos del usuario
  cargarUsuario():void {
    this.datosForm.get('nombre').setValue(this.usuarioService.nombre);
    this.datosForm.get('email').setValue(this.usuarioService.email);
    this.datosForm.get('edad').setValue(this.usuarioService.edad);
    this.datosForm.get('ubicacion').setValue(this.usuarioService.ubicacion);
    this.datosForm.markAsPristine();
  }

  cancelarPassword() {
    this.sendpass = false;
    this.showOKP = false;
    this.datosPassword.reset();
  }

  campoNoValido( campo: string): boolean {
    return this.datosForm.get(campo).invalid;
  }

  campopNoValido( campo: string): boolean {
    return this.datosPassword.get(campo).invalid && this.sendpass;
  }
  // Comprobar que los campos son iguales
  passwordNoIgual(): boolean {
    return !(this.datosPassword.get('nuevopassword').value === this.datosPassword.get('nuevopassword2').value) && this.sendpass;
  }

}
