import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

class User {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = ''
  ) {}
}

@Component({
  selector: 'duplicate-form',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      forms: this.fb.array([this.createFormGroup()])
    });
  }

  get forms() {
    return this.myForm.get('forms') as FormArray;
  }

  createFormGroup(user: User = new User()): FormGroup {
    return this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]]
    });
  }

  addForm(index?: number) {
    const newFormGroup = this.createFormGroup();
    if (index !== undefined) {
      this.forms.insert(index + 1, newFormGroup);
    } else {
      this.forms.insert(0, newFormGroup);
    }
  }

  duplicateForm(index: number) {
    const user = this.forms.at(index).value as User;
    const newFormGroup = this.createFormGroup(user);
    this.forms.insert(index + 1, newFormGroup);
  }

  deleteForm(index: number) {
    this.forms.removeAt(index);
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}
