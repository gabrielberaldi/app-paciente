import { Injectable } from '@angular/core';
import { PacientesService } from './pacientes.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private _pacienteService: PacientesService,
    private _router: Router,
    private _tostrService: ToastrService
  ) { }

  onSave(pacienteForm: FormGroup): void {
    if(pacienteForm.invalid) {
      pacienteForm.markAllAsTouched();
      this._tostrService.warning('Preencha todos os campos da aba Pacientes e Anamnese');
    } else {
      const id = pacienteForm.get('id').value;
      if (!id) this._saveData(pacienteForm);
      else this._updateData(pacienteForm);
    }
  }

  onDelete(id: number): void {
    this._pacienteService.delete(id).subscribe(() => this.onBack());
  }

  onBack(): void {
    this._router.navigateByUrl(`/pacientes`);
  }

  private _saveData(pacienteForm: FormGroup): void {
    this._pacienteService.add(pacienteForm.value).subscribe(({ id }) =>
      this._router.navigateByUrl(`/pacientes/${id}`)
    )
  }

  private _updateData(pacienteForm: FormGroup): void {
    this._pacienteService.update(pacienteForm.value).subscribe();
  }

}
