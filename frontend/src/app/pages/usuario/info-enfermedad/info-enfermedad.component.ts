import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SintomaService } from '../../../services/sintoma.service';
import { EnfermedadService } from 'src/app/services/enfermedad.service';
import { Enfermedad } from 'src/app/models/enfermedad.model';
import { Sintoma } from 'src/app/models/sintoma.model';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-enfermedad',
  templateUrl: './info-enfermedad.component.html',
  styleUrls: ['./info-enfermedad.component.css']
})
export class InfoEnfermedadComponent implements OnInit {

  public enfermedad: Enfermedad;
  public uidEnfermedad: string = '';

  public cargando: boolean = false;

  constructor(private fb: FormBuilder,
    private enfermedadService: EnfermedadService,
    private sintomaService: SintomaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.uidEnfermedad = this.route.snapshot.params['uid'];
    this.cargarEnfermedad(this.uidEnfermedad);
  }


  cargarEnfermedad(uidEnfermedad){
    this.cargando = true;
    this.enfermedadService.cargarEnfermedad(uidEnfermedad)
      .subscribe(res => {
        this.cargando = false;
        this.enfermedad = res['enfermedades'];
      }, (err) => {
        this.cargando = false;
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        return;
      }	);	
  }


  mostrarSintomas(sintomas: Array<Sintoma>){
    let sintomasString = '';
    sintomas.forEach(sintoma => {
      sintomasString += sintoma.nombre + ', ';
    });
    return sintomasString.substring(0, sintomasString.length - 2);
    
 }

 irAlSintoma(uidSintoma:string){
    
  this.router.navigateByUrl('/usuario/info-sintoma/' + uidSintoma);

  }



  
  
 }




