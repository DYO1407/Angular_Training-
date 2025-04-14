import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'simple-dynamic-forms',
  templateUrl: './simple-dynamic-forms.component.html',
  styleUrls: ['./simple-dynamic-forms.component.css']
})
export class SimpleDynamicFormsComponent {

  form: FormGroup;
  syncDisabled: boolean = false; // Master flag to disable sync
  counter = 1; // ID generator

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      parents: new FormArray([])
    });

    this.addParent(); // Add one parent by default
  }

  /**
   * Returns the FormArray containing all parents.
   */
  get parents(): FormArray {
    return this.form.get('parents') as FormArray;
  }

  /**
   * Returns the FormArray containing children of the specified parent.
   */
  children(parentIndex: number): FormArray {
    return this.parents.at(parentIndex).get('children') as FormArray<FormGroup>;
  }

  /**
   * Generates a unique ID for a child.
   */
  generateId(): any {
    return this.counter++;
  }

  /**
   * Creates a new child FormGroup with default values and validation.
   */
  newChild(): FormGroup {
    return this.fb.group({
      selected: [false],
      id: [{ value: this.generateId(), disabled: true }],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Creates a new parent FormGroup with one default child.
   * Sets up value change subscription for children to update parent checkbox state.
   */
  newParent(): FormGroup {
    const parent = this.fb.group({
      selected: [false],
      children: this.fb.array([this.newChild()])
    });

    const children = parent.get('children') as FormArray;
    children.valueChanges.subscribe(() => {
      this.updateParentCheckboxState(parent);
    });

    return parent;
  }

  /**
   * Adds a new parent to the FormArray.
   */
  addParent(): void {
    this.parents.push(this.newParent());
  }

  /**
   * Returns the first parent in the FormArray.
   */
  getTheParent(): FormGroup {
    return this.parents.at(0) as FormGroup;
  }

  /**
   * Checks if synchronization between original and duplicated parent is enabled.
   */
  isSyncEnabled(): boolean {
    return !this.syncDisabled;
  }

  isBulkSelecting: boolean = false;




  /**
   * Duplicates the first parent and its children.
   * Sets up synchronization between original and duplicated children.
   */
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

    const originalChildren = this.children(0);
    const duplicateChildren = this.children(1);

    originalChildren.controls.forEach((child, i) => {
      child.get('selected')?.valueChanges.subscribe(value => {
        // Sync only if not in bulk selection mode
        if (this.isSyncEnabled() && !this.isBulkSelecting) {
          duplicateChildren.at(i).get('selected')?.setValue(value, { emitEvent: false });
        }
      });
    });


    const children = duplicatedParent.get('children') as FormArray;
    children.valueChanges.subscribe(() => {
      this.updateParentCheckboxState(duplicatedParent);
      
    });
  }

  /**
   * Removes a parent from the FormArray at the specified index.
   */
  removeParent(index: number): void {
    this.parents.removeAt(index);
  }

  /**
   * Adds a new child to the specified parent.
   * Updates the parent checkbox state after adding the child.
   */
  addChild(parentIndex: number): void {
    const parent = this.parents.at(parentIndex) as FormGroup;
    const children = parent.get('children') as FormArray;
    children.push(this.newChild());
    this.updateParentCheckboxState(parent);
  }

  /**
   * Removes a child from the specified parent at the given index.
   */
  removeChild(parentIndex: number, childIndex: number): void {
    this.children(parentIndex).removeAt(childIndex);
  }

  /**
   * Logs the current form value to the console when the form is submitted.
   */
  onSubmit(): void {
    console.log(this.form.value);
  }

  isSelectAllEnabled: boolean = false;

  /**
   * Toggles the "Select All" state for all children of the specified parent.
   * If enabled, all children will be selected; otherwise, all will be deselected.
   */
toggleSelectAll(parentIndex: number): void {
  this.isSelectAllEnabled = !this.isSelectAllEnabled;

  // Mark that we are bulk-selecting
  this.isBulkSelecting = true;

  const targetedParent = this.parents.at(parentIndex) as FormGroup;
  const children = targetedParent.get('children') as FormArray;

  children.controls.forEach(child => {
    child.get('selected')?.setValue(this.isSelectAllEnabled);
  });

  // Reset the flag right after
  setTimeout(() => {
    this.isBulkSelecting = false;
  });
}

  /**
   * Updates the parent checkbox state based on the selection state of its children.
   * If all children are selected, the parent checkbox is marked as selected.
   */
  updateParentCheckboxState(parent: FormGroup): void {
    const children = parent.get('children') as FormArray;
    const allSelected = children.controls.every(child => child.get('selected')?.value === true);
    parent.get('selected')?.setValue(allSelected, { emitEvent: false });
  }

  /**
   * Toggles the synchronization state between the original and duplicated parent.
   * When disabled, changes in selection will not be synced.
   */
  toggleSyncDisabled(): void {
    this.syncDisabled = !this.syncDisabled;
  }
}
