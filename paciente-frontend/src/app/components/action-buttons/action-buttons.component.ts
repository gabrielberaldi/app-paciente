import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss'
})
export class ActionButtonsComponent {

  @Input() hidden: boolean = false;
  @Input({required: true}) form!: FormGroup;
  @Output() save = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  constructor() {}

  onSave(): void {
    this.save.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }

  onBack(): void {
    this.back.emit();
  }

  get id(): AbstractControl {
    return this.form.get('id'); 
  }
  
}
