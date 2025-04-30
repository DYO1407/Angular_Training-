import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'selectall-checkbox',
  templateUrl: './selectall-checkbox.component.html',
  styleUrl: './selectall-checkbox.component.css'
})
export class SelectallCheckboxComponent {



  @Input() isChecked: boolean = false;
  @Output() isCheckedChange = new EventEmitter<boolean>();

  onChange(): void {
    this.isCheckedChange.emit(this.isChecked);
  }
}

