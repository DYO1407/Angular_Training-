// ✅ Child Component: dynamic-form-group.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.css']
})
export class DynamicFormGroupComponent implements OnInit {
  @Input() syncEnabled: boolean = true;
  @Output() formChanged = new EventEmitter<FormGroup>();

  form: FormGroup;
  counter = 1;
  isBulkSelecting: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      parents: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addParent();
    this.form.valueChanges.subscribe(() => {
      this.formChanged.emit(this.form);
    });
  }

  get parents(): FormArray {
    return this.form.get('parents') as FormArray;
  }

  children(index: number): FormArray {
    return this.parents.at(index).get('children') as FormArray;
  }

  generateId(): number {
    return this.counter++;
  }

  newChild(): FormGroup {
    return this.fb.group({
      selected: [false],
      id: [{ value: this.generateId(), disabled: true }],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

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

  addParent(): void {
    this.parents.push(this.newParent());
  }

  duplicateParent(): void {
    const original = this.parents.at(0);
    const duplicate = this.fb.group({
      selected: [original.get('selected')?.value],
      children: this.fb.array(
        (original.get('children') as FormArray).controls.map(child => {
          return this.fb.group({
            selected: [child.get('selected')?.value],
            id: [{ value: child.get('id')?.value, disabled: true }],
            name: [child.get('name')?.value, Validators.required],
            email: [child.get('email')?.value, [Validators.required, Validators.email]]
          });
        })
      )
    });

    this.parents.push(duplicate);

    const originalChildren = this.children(0);
    const duplicateChildren = this.children(1);

    originalChildren.controls.forEach((child, i) => {
      child.get('selected')?.valueChanges.subscribe(value => {
        if (this.syncEnabled && !this.isBulkSelecting) {
          duplicateChildren.at(i).get('selected')?.setValue(value, { emitEvent: false });
        }
      });
    });

    const children = duplicate.get('children') as FormArray;
    children.valueChanges.subscribe(() => {
      this.updateParentCheckboxState(duplicate);
    });
  }

  toggleSelectAll(index: number): void {
    this.isBulkSelecting = true;
    const parent = this.parents.at(index);
    const children = parent.get('children') as FormArray;
    const allSelected = parent.get('selected')?.value;

    children.controls.forEach(child => {
      child.get('selected')?.setValue(allSelected, { emitEvent: true });
    });

    setTimeout(() => (this.isBulkSelecting = false));
  }

  updateParentCheckboxState(parent: FormGroup): void {
    const children = parent.get('children') as FormArray;
    const allSelected = children.controls.every(c => c.get('selected')?.value);
    parent.get('selected')?.setValue(allSelected, { emitEvent: false });
  }

  addChild(index: number): void {
    this.children(index).push(this.newChild());
  }

  removeChild(parentIndex: number, childIndex: number): void {
    this.children(parentIndex).removeAt(childIndex);
  }

  removeParent(index: number): void {
    this.parents.removeAt(index);
  }
}
