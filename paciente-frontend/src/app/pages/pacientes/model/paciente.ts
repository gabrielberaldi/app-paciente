import { Anamnese } from "./anamnese";

export interface Paciente {
  id?: number;
  nomeCompleto: string;
  dataNascimento: any;
  sexo: string;
  idade: number;
  anamnese: Anamnese;
}

export interface PacienteListagem {
  items: Paciente[];
  count: number;
}