import { Persona } from "./persona";

export interface Cita{
    id:string;
    titulo:string;
    motivo:string;
    fecha:string;
    hora:string;
    persona_id:string;
    persona:Persona;
    action:string;
}