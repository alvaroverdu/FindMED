import { Sintoma } from './sintoma.model';

export class Enfermedad {
    constructor(
        public nombre: string,
        public descripcion: string,
        public tratamiento: string,
        public sintomas?: Sintoma[],
        public uid?: string,
        public _id?: string
    )
    {}
}