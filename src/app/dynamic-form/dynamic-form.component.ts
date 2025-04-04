import { Component } from '@angular/core';
import { FormArray, FormGroup, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {

  form:FormGroup;

  constructor(private fb: FormBuilder) { // Inject FormBuilder service

    this.form=this.fb.group(
      {
        contacts: this.fb.array([]) // Initialize contacts as an empty FormArray
      });

      this.addContact(); // Add the first contact form group

  }

  selectAll: boolean = false;

toggleAll(): void {
  this.selectAll = !this.selectAll;
  this.contacts.controls.forEach(control => {
    control.get('selected')?.setValue(this.selectAll);
  });
}

updateSelectAll(): void {
  const allSelected = this.contacts.controls.every(control => control.get('selected')?.value === true);
  this.selectAll = allSelected;
}



get contacts(): FormArray { // Getter for contacts FormArray
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
}

onSubmit(): void {
  console.log(this.form.value);
}

}



// Part	Meaning
// contactGroup.get('selected')	Gets the FormControl for the selected checkbox.
// ?.	Optional chaining – only continues if selected exists.
// .valueChanges	An Observable that emits every time the checkbox value changes.
// .subscribe(() => this.updateSelectAll())	When the value changes (checked/unchecked), call the method updateSelectAll() to update the master checkbox.
