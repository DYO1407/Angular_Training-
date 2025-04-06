import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'simple-dynamic-forms',
  templateUrl: './simple-dynamic-forms.component.html',
  styleUrl: './simple-dynamic-forms.component.css'
})
export class SimpleDynamicFormsComponent {


  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      parents: new FormArray([]) // Initialize parents as an empty FormArray of FormGroups
    });

    // Add one parent with one child by default
    this.addParent();
  }

  get parents(): FormArray {
    return this.form.get('parents') as FormArray;
  }

  children(parentIndex: number) {
    return this.parents.at(parentIndex).get('children') as FormArray<FormGroup>;
  }

  newChild(): FormGroup {
    return this.fb.group({
      selected: [false],
      id: [{value: this.generateId(),disabled: true}],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  counter = 1; // Initialize counter outside of the function
  generateId(): any {
  return this.counter++; // Increment the counter and return its value
  }

  newParent(): FormGroup {
    const parent = this.fb.group({
      selected: [false],
      children: this.fb.array([this.newChild()])
    });

    // Subscribe to children value changes
    const children = parent.get('children') as FormArray;
    children.valueChanges.subscribe(() => {
      this.updateParentCheckboxState(parent);
    });

    return parent;
  }
  addParent(): void {
    this.parents.push(this.newParent());
  }

  getTheParent(): FormGroup {
    return this.parents.at(0) as FormGroup;
  }


//   Retrieve the Parent to Duplicate:

// Use this.getTheParent() to get the first parent FormGroup.
// Deep Copy of the Parent:

// Create a new FormGroup for the duplicated parent using FormBuilder.
// Copy the selected value from the original parent.
// Deep Copy of Children:

// Use map to iterate over the children FormArray of the original parent.
// For each child, create a new FormGroup with the same values for selected, id, name, and email.
// The id field is copied as-is, and it remains disabled.
// Add the Duplicated Parent:

// Push the newly created duplicatedParent FormGroup into the parents FormArray.

  duplicateParent(): void {
    const parentToDuplicate = this.getTheParent();

    const duplicatedParent = this.fb.group({
      selected: [parentToDuplicate.get('selected')?.value],
      children: this.fb.array(
        (parentToDuplicate.get('children') as FormArray).controls.map(child => {
          return this.fb.group({
            selected: [child.get('selected')?.value],
            id: [{ value: child.get('id')?.value, disabled: true }],
            name: [child.get('name')?.value, Validators.required],
            email: [child.get('email')?.value, [Validators.required, Validators.email]]
          });
        })
      )
    });

    this.parents.push(duplicatedParent);
  }

  removeParent(index: number): void {
    this.parents.removeAt(index);
  }

  addChild(parentIndex: number): void {
    const parent = this.parents.at(parentIndex) as FormGroup;
    const children = parent.get('children') as FormArray;

    children.push(this.newChild());
    this.updateParentCheckboxState(parent)
  }
  removeChild(parentIndex: number, childIndex: number): void {
    this.children(parentIndex).removeAt(childIndex);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }



isSelectAllEnabled:boolean = false;

toggleSelectAll(parentIndex :number): void {
this.isSelectAllEnabled = !this.isSelectAllEnabled; // Toggle the master checkbox state
const targetedParent = this.parents.at(parentIndex) as FormGroup; // Get the targeted parent FormGroup
  (targetedParent.get('children')as FormArray).controls.forEach(child => {
  child.get('selected').setValue(this.isSelectAllEnabled); // Update the child checkboxes based on the master checkbox state
  });

}

updateParentCheckboxState(parent: FormGroup): void {
  const children = parent.get('children') as FormArray;
  const allSelected = children.controls.every(child => child.get('selected')?.value === true);
  parent.get('selected')?.setValue(allSelected, { emitEvent: false }); // Update parent checkbox without emitting an event
}






}

