import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SintomaService } from '../../../services/sintoma.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sintoma } from 'src/app/models/sintoma.model';



@Component({
  selector: 'app-biblio-sintomas',
  templateUrl: './biblio-sintomas.component.html',
  styleUrls: ['./biblio-sintomas.component.css']
})
export class BiblioSintomasComponent implements OnInit {

  public sintomaForm = this.fb.group({
    sintomas: [''],
  });

  public sintomas: Sintoma[] = [];


  constructor(private fb: FormBuilder,
    private sintomaService: SintomaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarSintomas();
  }


  cargarSintomas() {
    // cargamos todos los cursos
    this.sintomaService.cargarSintomas(0, '', 'todos')
      .subscribe(res => {
        this.sintomas = res['sintomas'];
        console.log(res['sintomas']);
      });
  }

  buscar(){
    this.router.navigateByUrl('/usuario/info-sintoma' + '/' + this.sintomaForm.value.sintomas);
  }



}
