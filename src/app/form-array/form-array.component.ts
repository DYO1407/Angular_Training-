import { Component } from '@angular/core';
import{ FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})

export class FormArrayComponent {


  constructor(private fb: FormBuilder) {}

  myForm= this.fb.group({
    emails: this.fb.array([this.fb.control('',[Validators.required,Validators.email])])
});


get getEmails()
{
  return this.myForm.get('emails') as FormArray;

}

addEmail()
{
  this.getEmails.insert(0,this.fb.control('',[Validators.required,Validators.email]));
}

deleteEmail(index:number)
{
  this.getEmails.removeAt(index);

}

onSubmit()
{
  console.log(this.myForm.value);

}

}
