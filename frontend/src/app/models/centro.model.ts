import { Enfermedad } from './enfermedad.model';

export class Centro {
    constructor(
        public nombre: string,
        public especialidad: string,
        public ubicacion: string,
        public enfermedades?: Enfermedad[],
        public uid?: string,
    )
    {}
}