import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { SintomaService } from 'src/app/services/sintoma.service';
import { CentroService } from 'src/app/services/centro.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sintoma } from 'src/app/models/sintoma.model';
import { Enfermedad } from 'src/app/models/enfermedad.model';
import { Centro } from 'src/app/models/centro.model';

@Component({
  selector: 'app-biblio-centros',
  templateUrl: './biblio-centros.component.html',
  styleUrls: ['./biblio-centros.component.css']
})
export class BiblioCentrosComponent implements OnInit {

  public centroForm = this.fb.group({
    centros: [''],
  });

  public centros: Centro[] = [];

  constructor(private fb: FormBuilder,
    private enfermedadService: EnfermedadService,
    private sintomaService: SintomaService,
    private centroService: CentroService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarCentros();
  }

  cargarCentros() {
    // cargamos todos las enfermedades
    this.centroService.cargarCentros(0, '','todos')
      .subscribe( res => {
        this.centros = res['centros'];
      });
  }

  buscar(){
    this.router.navigateByUrl('/usuario/info-centro' + '/' + this.centroForm.value.centros);
  }

}
