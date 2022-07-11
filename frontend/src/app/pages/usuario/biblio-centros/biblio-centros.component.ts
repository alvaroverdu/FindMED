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
    provincias: [''],
  });

  public centros: Centro[] = [];
  public centrosFiltrados: Centro[] = [];
  public buscado: boolean;


  public provincias = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

  constructor(private fb: FormBuilder,
    private enfermedadService: EnfermedadService,
    private sintomaService: SintomaService,
    private centroService: CentroService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarCentros();
    this.buscado=false;
  }

  cargarCentros() {
    // cargamos todos las enfermedades
    this.centroService.cargarCentros(0, '','todos')
      .subscribe( res => {
        this.centros = res['centros'];
      });
  }

  buscarProvinciaIgual(){
    this.centros.forEach(centro => {
      if(this.centroForm.value.provincias === centro.ubicacion){
        this.centrosFiltrados.push(centro);
      }
      console.log('Centros', this.centrosFiltrados);
    });
    this.buscado=true;
  }

  mostrarCentros(){
    let centroString = '';
    this.centrosFiltrados.forEach(centro => {
      centroString += centro.nombre + ', ';
    });
    return centroString.substring(0, centroString.length - 2);
}

comprobarCentros(){
  if(this.centrosFiltrados.length !== 0){
   return true;
  }
  else{
    return false;
  }
}

irAlCentro(centro: String ){
  this.router.navigateByUrl('/usuario/info-centro/' + centro);
 }


}
