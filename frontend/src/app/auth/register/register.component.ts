import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmint = false;
  public enablepass: boolean = true;
  public waiting = false;

  public registerForm = this.fb.group({
    email: [ '', [Validators.required, Validators.email] ],
    nombre: ['', Validators.required ],
    edad: ['', Validators.required],
    password: ['', Validators.required ],
    remember: [ false || localStorage.getItem('email') ]
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  register() {
    this.formSubmint = true;
    if (!this.registerForm.valid) {
      console.warn('Errores en le formulario');
      return;
    }
    this.waiting = true;
    this.usuarioService.nuevoUsuario( this.registerForm.value)
      .subscribe( res => {
        // console.log('Entra aquí');
        this.waiting = false;
        this.registerForm.get('password').disable();
        this.enablepass = false;
        this.registerForm.markAsPristine();
        this.usuarioService.limpiarLocalStore();
        localStorage.setItem('email', this.registerForm.value.email);
        this.router.navigateByUrl('/login');
      }, (err) => {
        const errtext = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo.';
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errtext,
        });
        this.waiting = false;
        return;
      });

  }

  campoValido( campo: string) {
    return this.registerForm.get(campo).valid || !this.formSubmint;
  }
  


}
