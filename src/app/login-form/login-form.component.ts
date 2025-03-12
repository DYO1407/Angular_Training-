import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  signUpForm = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    lastName: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    address: new FormGroup({
      street: new FormControl("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      city: new FormControl("", [Validators.required, Validators.minLength(5)]),
      region: new FormControl("", [Validators.required])
    })
  });

  updateProfile() {
    this.signUpForm.patchValue({
      firstName: "Jane",
      lastName: "Smith",
      address: {
        street: "123 1st Street"
      }
    });
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }
}
