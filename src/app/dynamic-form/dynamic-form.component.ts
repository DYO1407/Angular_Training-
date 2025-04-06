import { Component } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'] // Fixed typo here
})
export class DynamicFormComponent {
  form: FormGroup;
  selectAll: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contacts: this.fb.array([]) // Initialize contacts as an empty FormArray of FormGroups wgich will be added dynamically
                                 //  and will contain the contact form groups of controls 
    });

    this.addContact(); // Add the first contact form group
  }

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  newContact(): FormGroup {
    const contactGroup = this.fb.group({
      selected: [false],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // React to selection changes
    contactGroup.get('selected')?.valueChanges.subscribe(() => this.updateSelectAll());

    return contactGroup;
  }

  addContact(): void {
    this.contacts.push(this.newContact());
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
    this.updateSelectAll(); // Update the "Select All" checkbox state after removing a contact
  }

  toggleAll(): void {
    this.selectAll = !this.selectAll; // Toggle the master checkbox state
    this.contacts.controls.forEach(control => {
      control.get('selected')?.setValue(this.selectAll, { emitEvent: false }); // Avoid triggering valueChanges
    });
  }

  updateSelectAll(): void {
    const allSelected = this.contacts.controls.every(control => control.get('selected')?.value === true);
    this.selectAll = allSelected;
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
