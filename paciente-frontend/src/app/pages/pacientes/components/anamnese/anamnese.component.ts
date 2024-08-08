import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActionButtonsComponent } from 'src/app/components/action-buttons/action-buttons.component';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-anamnese',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, ActionButtonsComponent],
  templateUrl: './anamnese.component.html',
  styleUrl: './anamnese.component.scss'
})
export class AnamneseComponent implements OnInit {
  @Input({required: true}) formulario!: FormGroup;

  constructor(
    private _actionService: ActionService
  ){}

  ngOnInit(): void {
  }

  onSave(): void {
    this._actionService.onSave(this.formulario);
  }

  onDelete(): void {
    this._actionService.onDelete(this.id);
  }

  onBack(): void {
    this._actionService.onBack();
  }

  get id(): number {
    return this.formulario.get('id')?.value;
  }

  get anamneseForm(): FormGroup {
    return this.formulario.get('anamnese') as FormGroup;
  }

}
