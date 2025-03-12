import { Component, OnInit } from '@angular/core';
import { FormArray, FormsModule, Validators } from '@angular/forms';
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

      skills : new FormArray([

        new FormControl(null,Validators.required),
        new FormControl(null,Validators.required),

      ])
    });


  }

  get skills(){
    return this.reactiveForm.get('skills') as FormArray;
  }


  onSubmit() {
    console.log(this.reactiveForm.value);
    console.log(this.skills.value);
    this.reactiveForm.reset();
  }
}
