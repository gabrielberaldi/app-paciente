import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { Paciente, PacienteListagem } from '../model/paciente';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService
  ) { }

  getAll(page: number, pageSize: number, title: string): Observable<PacienteListagem> {
    return this._http.get<PacienteListagem>(`${this._route()}`, { params: { page, pageSize, title } })
    .pipe(
      map(pacientesListagem => {
        pacientesListagem.items.map(paciente =>( {
          ...paciente,
          sexo: paciente.sexo === 'F' ? 'Feminino' : 'Masculino'
        }))
        return pacientesListagem;
      })
    )
  }

  getById(id: number): Observable<Paciente> {
    return this._http.get<Paciente>(`${this._route()}/${id}`)
  }

  add({id, ...body}: Paciente): Observable<Paciente> {
    return this._http.post<Paciente>(`${this._route()}`, body )
    .pipe(
      tap(() => this._toastrService.success('Operação realizada com sucesso')),
      catchError(() => { throw this._toastrService.error('Erro ao salvar dados')})
    )
  }

  update({id, ...body}: Paciente): Observable<Paciente> {
    return this._http.put<Paciente>(`${this._route()}/${id}`, body)
    .pipe(
      tap(() => this._toastrService.success('Operação realizada com sucesso')),
      catchError(() => { throw this._toastrService.error('Erro ao atualizar dados')})
    )
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this._route()}/${id}`)
    .pipe(
      tap(() => this._toastrService.success('Operação realizada com sucesso')),
      catchError(() => { throw this._toastrService.error('Erro ao excluir dados')})
    )
  }

  private _route(): string {
    return "https://localhost:7154/api/paciente";
  }
}
