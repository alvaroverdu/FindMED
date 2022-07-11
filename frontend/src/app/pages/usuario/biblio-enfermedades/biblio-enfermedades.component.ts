import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { SintomaService } from 'src/app/services/sintoma.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sintoma } from 'src/app/models/sintoma.model';
import { Enfermedad } from 'src/app/models/enfermedad.model';



@Component({
  selector: 'app-biblio-enfermedades',
  templateUrl: './biblio-enfermedades.component.html',
  styleUrls: ['./biblio-enfermedades.component.css']
})
export class BiblioEnfermedadesComponent implements OnInit {

  public enfermedadForm = this.fb.group({
    enfermedades: [''],
  });

  public enfermedades: Enfermedad[] = [];
  

  constructor(private fb: FormBuilder,
    private enfermedadService: EnfermedadService,
    private sintomaService: SintomaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarEnfermedades();
  }


  cargarEnfermedades() {
    // cargamos todos las enfermedades
    this.enfermedadService.cargarEnfermedades(0, '','todos')
      .subscribe( res => {
        this.enfermedades = res['enfermedades'];
      });
  }

  buscar(){
    this.router.navigateByUrl('/usuario/info-enfermedad' + '/' + this.enfermedadForm.value.enfermedades);
  }

}
