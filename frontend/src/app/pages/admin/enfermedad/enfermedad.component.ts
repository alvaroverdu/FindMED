import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { SintomaService } from 'src/app/services/sintoma.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sintoma } from 'src/app/models/sintoma.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-enfermedad',
  templateUrl: './enfermedad.component.html',
  styleUrls: ['./enfermedad.component.css']
})
export class EnfermedadComponent implements OnInit {

  

  public datosForm = this.fb.group({
    uid: [{ value: 'nuevo', disabled: true }, Validators.required],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    tratamiento: ['', Validators.required],
    sintomas: [''],
  });
  public submited = false;
  public uid: string = 'nuevo';

  public sintomas: Sintoma[] = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor(private fb: FormBuilder,
    private enfermedadService: EnfermedadService,
    private sintomaService: SintomaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.cargarSintomas();
    this.uid = this.route.snapshot.params['uid'];
    this.datosForm.get('uid').setValue(this.uid);
    this.cargarDatos(this.uid);

    //DROPDOWN SELECT

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'uid',
      textField: 'nombre',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }



  cargarDatos(uid: string) {
    this.submited = false;
    if (this.uid !== 'nuevo') {
      this.enfermedadService.cargarEnfermedad(this.uid)
        .subscribe(res => {
          if (!res['enfermedades']) {
            this.router.navigateByUrl('/admin/enfermedades');
            return;
          };
          this.datosForm.get('nombre').setValue(res['enfermedades'].nombre);
          this.datosForm.get('descripcion').setValue(res['enfermedades'].descripcion);
          this.datosForm.get('tratamiento').setValue(res['enfermedades'].tratamiento);
          this.datosForm.get('sintomas').setValue(res['enfermedades'].sintomas);

          this.datosForm.markAsPristine();
          this.submited = true;
        }, (err) => {
          this.router.navigateByUrl('/admin/enfermedades');
          Swal.fire({ icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo', });
          return;
        });
    } else {
      this.datosForm.get('nombre').setValue('');
      this.datosForm.get('descripcion').setValue('');
      this.datosForm.get('tratamiento').setValue('');
      this.datosForm.get('sintomas').setValue(''); 
      this.datosForm.markAsPristine();
    }

  }

  cargarSintomas() {
    // cargamos todos los cursos
    this.sintomaService.cargarSintomas(0, '', 'todos')
      .subscribe(res => {
        this.sintomas = res['sintomas'];
        console.log(res['sintomas']);
      });
      

  }


  enviar() {
    this.submited = true;
    if (this.datosForm.invalid) { return; }

    // Si estamos creando uno nuevo
    if (this.datosForm.get('uid').value === 'nuevo') {
      this.enfermedadService.crearEnfermedad(this.datosForm.value)
        .subscribe(res => {
          this.datosForm.get('uid').setValue(res['enfermedad'].uid);
          this.datosForm.markAsPristine();
          console.log(this.datosForm);
        }, (err) => {
          const msgerror = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo';
          Swal.fire({ icon: 'error', title: 'Oops...', text: msgerror, });
        })
    } else {
      // ACtualizamos
      this.enfermedadService.actualizarEnfermedades(this.datosForm.get('uid').value, this.datosForm.value)
        .subscribe(res => {
          this.datosForm.markAsPristine();
        }, (err) => {
          const msgerror = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo';
          Swal.fire({ icon: 'error', title: 'Oops...', text: msgerror, });
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
      this.router.navigateByUrl('/admin/enfermedad');
    } else {
      this.cargarDatos(this.uid);
    }
  }

  campoNoValido(campo: string) {
    return this.datosForm.get(campo).invalid && this.submited;
  }

  esnuevo(): boolean {
    if (this.datosForm.get('uid').value === 'nuevo') { return true; }
    return false;
  }

}
