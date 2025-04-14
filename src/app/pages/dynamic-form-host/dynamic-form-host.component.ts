import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-host',
  templateUrl: './dynamic-form-host.component.html'
})
export class DynamicFormHostComponent {
  syncEnabled = true;

  onFormChanged(form: FormGroup): void {
    console.log('Form changed:', form.value);
  }

  toggleSync() {
    this.syncEnabled = !this.syncEnabled;
  }
}
