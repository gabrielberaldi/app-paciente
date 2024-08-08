import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/components/table/table.component';
import { PacientesService } from '../services/pacientes.service';
import { Paciente } from '../model/paciente';
import { PageEvent } from '@angular/material/paginator';
import { Button } from 'src/app/components/table/model/button';
import { Router } from '@angular/router';
import { ActionButton } from 'src/app/components/table/model/action-button';


@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nomeCompleto', 'sexo', 'idade', 'dataNascimento', 'action'];
  data: Paciente[] = [];
  count: number = 0;
  title: string = "Listagem pacientes";
    
  constructor(
    private _pacientesService: PacientesService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._getPacientes();
  }

  pageChanged(pageEvent: PageEvent): void {
    this._getPacientes(pageEvent.pageIndex, pageEvent.pageSize);
  }

  onSearch(event: string): void {
    this._getPacientes(0, 10, event);
  }

  buttons(): Button[] {
    return [
      { text: 'Atualizar', action: this._getPacientes, color: 'light-info'},
      { text: 'Adicionar novo', action: this._addNew, color: 'success' }
    ]
  };

  actionButtons(): ActionButton[] {
    return [
      { color: 'success', icon: 'edit', action: this.edit },
      { color: 'danger', icon: 'delete', action: this.delete }
    ];
  }

  private _getPacientes = (page: number = 0, pageSize: number = 10, title: string = "")  =>  {
    this._pacientesService.getAll(page, pageSize, title).subscribe(response => {
      this.data = response.items;
      this.count = response.count;
    });
  }

  private _addNew = (): void => {
    this._router.navigateByUrl('/pacientes/novo');
  }

  private edit = ({id}: Paciente): void => {
    this._router.navigateByUrl(`/pacientes/${id}`);
  }

  private delete = ({id}: Paciente): void => {
    this._pacientesService.delete(id).subscribe(() => this._getPacientes());    
  }

}
