import { environment } from '../../environments/environment';
import { Grupo } from './grupo.model';
import { Enfermedad } from './enfermedad.model';
const base_url: string = environment.base_url;

export class Usuario {

    constructor( public uid: string,
                 public rol: string,
                 public nombre?: string,
                 public email?: string,
                 public edad?: number,
                 public ubicacion?: string,
                 public enfermedades?: Enfermedad[],
                 public alta?: Date,
                 public activo?: boolean,
                 public imagen?: string) {}

    get imagenUrl(): string {
        // Devolvemos la imagen en forma de peticilon a la API
        const token = localStorage.getItem('token') || '';
        if (!this.imagen) {
            return `${base_url}/upload/fotoperfil/no-imagen?token=${token}`; 
        }
        return `${base_url}/upload/fotoperfil/${this.imagen}?token=${token}`;
    }
}