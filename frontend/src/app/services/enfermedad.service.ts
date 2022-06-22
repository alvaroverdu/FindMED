import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sintoma } from '../models/sintoma.model';
import { Enfermedad } from '../models/enfermedad.model';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  constructor( private http: HttpClient) {  }

  cargarEnfermedad( uid: string): Observable<object> {
    if (!uid) { uid = '';}
    return this.http.get(`${environment.base_url}/enfermedades/?id=${uid}` , this.cabeceras);
  }

  cargarEnfermedades( desde: number, textoBusqueda?: string, hasta?:string ): Observable<object> {
    if (!desde) { desde = 0; }
    if (!textoBusqueda) { textoBusqueda = ''; }
    if (!hasta) { hasta = '10'; }
    return this.http.get(`${environment.base_url}/enfermedades/?desde=${desde}&texto=${textoBusqueda}&hasta=${hasta}` , this.cabeceras);
  }

  crearSintoma( data: Enfermedad ): Observable<object> {
    return this.http.post(`${environment.base_url}/enfermedades/`, data, this.cabeceras);
  }

  actualizarEnfermedades(uid: string, data: Enfermedad): Observable<object> {
    return this.http.put(`${environment.base_url}/enfermedades/${uid}`, data, this.cabeceras);
  }

  eliminarEnfermedades (uid) {
    return this.http.delete(`${environment.base_url}/enfermedades/${uid}`, this.cabeceras);
  }

  get cabeceras() {
    return {
      headers: {
        'x-token': this.token
      }};
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

}
