import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SintomaService } from '../../../services/sintoma.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sintoma',
  templateUrl: './sintoma.component.html',
  styleUrls: ['./sintoma.component.css']
})
export class SintomaComponent implements OnInit {

  public datosForm = this.fb.group({
    uid: [{value: 'nuevo', disabled: true}, Validators.required],
    nombre: ['', Validators.required ],
    descripcion: ['', Validators.required ]
  });
  public submited = false;
  public uid: string = 'nuevo';

  constructor( private fb: FormBuilder,
               private sintomaService: SintomaService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['uid'];
    this.datosForm.get('uid').setValue(this.uid);
    this.cargarDatos(this.uid);
  }

  cargarDatos( uid: string ) {
    this.submited = false;
    if (this.uid !== 'nuevo') {
      this.sintomaService.cargarSintoma(this.uid)
        .subscribe( res => {
          if (!res['sintomas']) {
            this.router.navigateByUrl('/admin/sintomas');
            return;
          };
          this.datosForm.get('nombre').setValue(res['sintomas'].nombre);
          this.datosForm.get('descripcion').setValue(res['sintomas'].nombrecorto);
          this.datosForm.markAsPristine();
          this.submited = true;
        }, (err) => {
          this.router.navigateByUrl('/admin/usuarios');
          Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
          return;
        });
    } else {
      this.datosForm.get('nombre').setValue('');
      this.datosForm.get('descripcion').setValue('');
      this.datosForm.markAsPristine();
    }

  }

  enviar() {
    this.submited = true;
    if (this.datosForm.invalid) { return; }

    // Si estamos creando uno nuevo
    if (this.datosForm.get('uid').value === 'nuevo') {
      this.sintomaService.crearSintoma( this.datosForm.value )
        .subscribe( res => {
          this.datosForm.get('uid').setValue( res['sintoma'].uid );
          this.datosForm.markAsPristine();
        }, (err) => {
          const msgerror = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo';
          Swal.fire({icon: 'error', title: 'Oops...', text: msgerror,});
        })
    } else {
      // ACtualizamos
      this.sintomaService.actualizarSintoma( this.datosForm.get('uid').value, this.datosForm.value)
        .subscribe( res => {
          this.datosForm.markAsPristine();
        }, (err) => {
          const msgerror = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo';
          Swal.fire({icon: 'error', title: 'Oops...', text: msgerror,});
        })
    }

  }

  nuevo() {
    this.uid = 'nuevo';
    this.datosForm.reset();
    this.datosForm.get('uid').setValue('nuevo');
    this.submited = false;
    this.datosForm.markAsPristine();
  }

  cancelar() {
    if (this.uid === 'nuevo') {
      this.router.navigateByUrl('/admin/sintomas');
    } else {
      this.cargarDatos(this.uid);
    }
  }

  campoNoValido( campo: string) {
    return this.datosForm.get(campo).invalid && this.submited;
  }

  esnuevo(): boolean {
    if (this.datosForm.get('uid').value === 'nuevo') { return true; }
    return false;
  }

}
