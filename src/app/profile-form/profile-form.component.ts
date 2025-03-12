import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css',
})
export class ProfileFormComponent implements OnInit {
  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl('ahmed'),
      lastName: new FormControl(''),
      phone: new FormControl('010-1234567'),
    });
  }

  onSubmit() {
    console.log(this.reactiveForm.value);
    this.reactiveForm.reset();
  }
}
