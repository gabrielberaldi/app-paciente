import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionButtonsComponent } from 'src/app/components/action-buttons/action-buttons.component';
import { PacientesService } from '../services/pacientes.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AnamneseComponent } from '../components/anamnese/anamnese.component';
import { ActionService } from '../services/action.service';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,
    FormsModule, ReactiveFormsModule, MatCheckboxModule,
    MatRadioModule, MatButtonModule, MatTabsModule,
    MatCardModule, MatSelectModule, 
    ActionButtonsComponent, MatDatepickerModule,
    AnamneseComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  pacienteForm: FormGroup = this._formBuilder.group({
    id: [null],
    nomeCompleto: ['', Validators.required],
    sexo: ['M', Validators.required],
    idade: [0, Validators.required],
    dataNascimento: [null, Validators.required],
    anamnese: this._formBuilder.group({
      queixaPrincipal: ['', Validators.required],
      historicoGestacao: ['', Validators.required],
      amamentacao: ['', Validators.required],
      examesNascimento: ['', Validators.required],
      alimentacao: ['', Validators.required],
      desenvolvimentoMotor: ['', Validators.required],
      desenvolvimentoLinguagem: ['', Validators.required],
      comunicacaoAmbienteSocial: ['', Validators.required],
      doencasComplicacoes: ['', Validators.required],
      sono: ['', Validators.required],
      historicoFamiliar: ['', Validators.required],
      comportamento: ['', Validators.required],
      rotinaDiaria: ['', Validators.required]
    })
  })

  options: { text: string, value: string }[] = [
    { text: 'Feminino', value: 'F' },
    { text: 'Masculino', value: 'M' }
  ]

  private _idRoute: number = this._activatedRoute.snapshot.params['id'];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _pacienteService: PacientesService,
    private _actionService: ActionService
  ) { }

  ngOnInit(): void {
    this._getData();
  }

  onSave(): void {
    this._actionService.onSave(this.pacienteForm);
  }

  onDelete(): void {
    this._actionService.onDelete(this.id);
  }

  onBack(): void {
    this._actionService.onBack();
  }

  get id(): number {
    return this.pacienteForm.get('id').value;
  }

  private _getData(): void {
    if (!this._idRoute) return;
    this._pacienteService.getById(this._idRoute).subscribe(paciente => {
      this.pacienteForm.patchValue(paciente);
    });
  }

}
