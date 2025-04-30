import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'profileform',
  templateUrl: './profileform.component.html',
  styleUrls: ['./profileform.component.css']
})
export class ProfileformComponent {

availableSkills = ['Angular', 'React', 'Vue', 'TypeScript', 'Node.js'];

profileForm: FormGroup

constructor(private fb: FormBuilder) {

  this.profileForm= this.fb.group({
    name:[''],
    email:[''],
    skills:this.fb.array([]) // FormArray to hold skills of Form group


  });

  this.initializeSkills();
}

ngDoCheck() {
  this.allSelected = this.areAllSkillsSelected();
}



get Skills()
  {
    return this.profileForm.get('skills') as FormArray;
  }


initializeSkills():void
  {
      const skillsControls = this.availableSkills.map(skill => this.fb.group(

        {
            name:[skill],
            isSelected:[false]
        }
      ))

      this.Skills.clear();

      skillsControls.forEach(control => this.Skills.push(control));
  }



  onSubmit(): void {
    console.log('Full form value:', this.profileForm.value);
  }


  allSelected = false;



toggleAllSkills(select: boolean): void {
  this.allSelected = select;
  this.Skills.controls.forEach(control => {
    control.get('isSelected')?.setValue(select);
  });
}


areAllSkillsSelected(): boolean {
  return this.Skills.controls.every(control => control.get('isSelected')?.value);
}









}
