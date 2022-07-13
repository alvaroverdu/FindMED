import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { SintomaService } from 'src/app/services/sintoma.service';
import { CentroService } from 'src/app/services/centro.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sintoma } from 'src/app/models/sintoma.model';
import { Enfermedad } from 'src/app/models/enfermedad.model';
import { Centro } from 'src/app/models/centro.model';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css']
})
export class CentroComponent implements OnInit {

  public datosForm = this.fb.group({
    uid: [{value: 'nuevo', disabled: true}, Validators.required],
    nombre: ['', Validators.required ],
    especialidad: ['', Validators.required ],
    ubicacion: ['', Validators.required ],
    enfermedades: ['', Validators.required ],
  });
  public submited = false;
  public uid: string = 'nuevo';

  public enfermedades: Enfermedad[] = [];
  public centros: Centro[] = [];

  public provincias = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor( private fb: FormBuilder,
               private enfermedadService: EnfermedadService,
               private centroService: CentroService,
               private sintomaService: SintomaService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.cargarEnfermedades();
    this.uid = this.route.snapshot.params['uid'];
    this.datosForm.get('uid').setValue(this.uid);
    this.cargarDatos(this.uid);
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
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  cargarDatos( uid: string ) {
    this.submited = false;
    if (this.uid !== 'nuevo') {
      this.centroService.cargarCentro(this.uid)
        .subscribe( res => {
          if (!res['centros']) {
            this.router.navigateByUrl('/admin/centros');
            return;
          };
          this.datosForm.get('nombre').setValue(res['centros'].nombre);
          this.datosForm.get('especialidad').setValue(res['centros'].especialidad);
          this.datosForm.get('ubicacion').setValue(res['centros'].ubicacion);
          this.datosForm.get('enfermedades').setValue(res['centros'].enfermedades);
          
          this.datosForm.markAsPristine();
          this.submited = true;
        }, (err) => {
          this.router.navigateByUrl('/admin/centros');
          Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
          return;
        });
    } else {
      this.datosForm.get('nombre').setValue('');
      this.datosForm.get('especialidad').setValue('');
      this.datosForm.get('ubicacion').setValue('');
      this.datosForm.get('enfermedades').setValue(''); 
      this.datosForm.markAsPristine();
    }

  }

  cargarEnfermedades() {
    // cargamos todos las enfermedades
    this.enfermedadService.cargarEnfermedades(0, '','todos')
      .subscribe( res => {
        this.enfermedades = res['enfermedades'];
      });
  }

  enviar() {
    this.submited = true;
    if (this.datosForm.invalid) { return; }

    // Si estamos creando uno nuevo
    if (this.datosForm.get('uid').value === 'nuevo') {
      this.centroService.crearCentro( this.datosForm.value )
        .subscribe( res => {
          this.datosForm.get('uid').setValue( res['centro'].uid );
          this.datosForm.markAsPristine();
        }, (err) => {
          const msgerror = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo';
          Swal.fire({icon: 'error', title: 'Oops...', text: msgerror,});
        })
    } else {
      // ACtualizamos
      this.centroService.actualizarCentros( this.datosForm.get('uid').value, this.datosForm.value)
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
      this.router.navigateByUrl('/admin/centro');
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
