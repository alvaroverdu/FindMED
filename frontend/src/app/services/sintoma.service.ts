import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sintoma } from '../models/sintoma.model';

@Injectable({
  providedIn: 'root'
})
export class SintomaService {

  constructor( private http: HttpClient) {  }

  cargarSintoma( uid: string): Observable<object> {
    if (!uid) { uid = '';}
    return this.http.get(`${environment.base_url}/sintomas/?id=${uid}` , this.cabeceras);
  }

  cargarSintomas( desde: number, textoBusqueda?: string, hasta?:string ): Observable<object> {
    if (!desde) { desde = 0; }
    if (!textoBusqueda) { textoBusqueda = ''; }
    if (!hasta) { hasta = '10'; }
    return this.http.get(`${environment.base_url}/sintomas/?desde=${desde}&texto=${textoBusqueda}&hasta=${hasta}` , this.cabeceras);
  }

  crearCurso( data: Sintoma ): Observable<object> {
    return this.http.post(`${environment.base_url}/sintomas/`, data, this.cabeceras);
  }

  actualizarCurso(uid: string, data: Sintoma): Observable<object> {
    return this.http.put(`${environment.base_url}/sintomas/${uid}`, data, this.cabeceras);
  }

  eliminarCurso (uid) {
    return this.http.delete(`${environment.base_url}/sintomas/${uid}`, this.cabeceras);
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
