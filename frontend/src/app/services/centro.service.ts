import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sintoma } from '../models/sintoma.model';
import { Enfermedad } from '../models/enfermedad.model';
import { Centro } from '../models/centro.model';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  constructor( private http: HttpClient) {  }

  cargarCentro( uid: string): Observable<object> {
    if (!uid) { uid = '';}
    return this.http.get(`${environment.base_url}/centros/?id=${uid}` , this.cabeceras);
  }

  cargarCentros( desde: number, textoBusqueda?: string, hasta?:string ): Observable<object> {
    if (!desde) { desde = 0; }
    if (!textoBusqueda) { textoBusqueda = ''; }
    if (!hasta) { hasta = '10'; }
    return this.http.get(`${environment.base_url}/centros/?desde=${desde}&texto=${textoBusqueda}&hasta=${hasta}` , this.cabeceras);
  }

  crearCentro( data: Centro ): Observable<object> {
    return this.http.post(`${environment.base_url}/centros/`, data, this.cabeceras);
  }

  actualizarCentros(uid: string, data: Centro): Observable<object> {
    return this.http.put(`${environment.base_url}/centros/${uid}`, data, this.cabeceras);
  }

  eliminarCentros (uid) {
    return this.http.delete(`${environment.base_url}/centros/${uid}`, this.cabeceras);
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
