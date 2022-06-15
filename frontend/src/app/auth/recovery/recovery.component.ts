import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  public waiting: boolean = false;

  public recoveryForm = this.fb.group({
    email: ['', [Validators.required, Validators.email] ],
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService : UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  recovery() {
    const data = {
      email : this.recoveryForm.get('email').value,
    };
    this.waiting = true;
    this.usuarioService.recuperarPassword(data)
    .subscribe( res => {
      this.waiting = false;
      localStorage.setItem('email', data.email);
      /*MENSAJE MODAL RECUPERAR CONTRASEÑA*/
      const textV = 'Se le ha reenviado un correo a ' + data.email + ' para recuperar su contraseña';
      Swal.fire({
        icon: 'success',
        title: 'Correo de recuperación enviado',
        text: textV,
      }).then((result) => {
        if(result.value) {
          this.router.navigateByUrl('/login');
        }
      })
    }, (err) => {
      const errtext = err.error.msg || 'No se pudo reenviar el correo de recuperación de contraseña, vuelva a intentarlo.';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errtext,
      }).then((result) => {
        if(result.value) {
          this.router.navigateByUrl('/recovery');
        }
      })
      this.waiting = false;
    });;
  }
}
