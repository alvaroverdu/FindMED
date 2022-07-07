import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SintomaService } from '../../../services/sintoma.service';
import { Sintoma } from 'src/app/models/sintoma.model';
import { EnfermedadService } from 'src/app/services/enfermedad.service';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-info-sintoma',
  templateUrl: './info-sintoma.component.html',
  styleUrls: ['./info-sintoma.component.css']
})
export class InfoSintomaComponent implements OnInit {

  public sintoma: Sintoma;
  public uidSintoma: string = '';

  public cargando: boolean = false;

  constructor(private fb: FormBuilder,
    private enfermedadService: EnfermedadService,
    private sintomaService: SintomaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.uidSintoma = this.route.snapshot.params['uid'];
    this.cargarSintoma(this.uidSintoma);
  }


  cargarSintoma(uidSintoma){
    this.cargando = true;
    this.sintomaService.cargarSintoma(uidSintoma)
      .subscribe(res => {
        this.cargando = false;
        this.sintoma = res['sintomas'];
      }, (err) => {
        this.cargando = false;
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        return;
      }	);	
  }

}
