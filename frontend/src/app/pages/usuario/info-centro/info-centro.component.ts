import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SintomaService } from '../../../services/sintoma.service';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { CentroService } from 'src/app/services/centro.service';
import { CentroComponent } from '../../admin/centro/centro.component';
import { Enfermedad } from 'src/app/models/enfermedad.model';
import { Sintoma } from 'src/app/models/sintoma.model';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Centro } from 'src/app/models/centro.model';

@Component({
  selector: 'app-info-centro',
  templateUrl: './info-centro.component.html',
  styleUrls: ['./info-centro.component.css']
})
export class InfoCentroComponent implements OnInit {

  public centro: Centro;
  public uidCentro: string = '';

  public cargando: boolean = false;

  constructor(private fb: FormBuilder,
    private enfermedadService: EnfermedadService,
    private centroService: CentroService,
    private sintomaService: SintomaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.uidCentro = this.route.snapshot.params['uid'];
    this.cargarCentro(this.uidCentro);
  }

  cargarCentro(uidCentro){
    this.cargando = true;
    this.centroService.cargarCentro(uidCentro)
      .subscribe(res => {
        this.cargando = false;
        this.centro = res['centros'];
      }, (err) => {
        this.cargando = false;
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        return;
      }	);	
  }

  irAlaEnfermedad(uidEnfermedad:string){
    
    this.router.navigateByUrl('/usuario/info_enfermedad/' + uidEnfermedad);
  
    }
  

}
