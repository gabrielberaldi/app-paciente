import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Button } from './model/button';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActionButton } from './model/action-button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatPaginatorModule, MatSortModule, CommonModule, MatButtonModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  @Input({required: true}) data!: any[];
  @Input({required: true}) displayedColumns!: string[];
  @Input({required: true}) length: number = 0;
  @Input({required: true}) title: string = "";
  @Input() buttons: Button[] = [];
  @Input() actionButtons: ActionButton[] = [];
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchControl: FormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void { 
    this.searchControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      startWith('')
    ).subscribe(value => this.search.emit(value));
  }

  pageChange(pageEvent: PageEvent): void {
    this.pageChanged.emit(pageEvent);
  }

  sticky(column: string): boolean {
    return column === 'action';
  }

}
