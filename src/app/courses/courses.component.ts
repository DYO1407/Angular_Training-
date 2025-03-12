import { Component } from '@angular/core';

@Component({
  selector: 'courses',
  template: `
             <p>courses works!</p>
             <input [(ngModel)]="email" (keyup.enter) ="onKeyUp()">

`,


                styleUrl: './courses.component.css'
})
export class CoursesComponent {

  email:string = "me@example.com";


  // updateEmail(event: Event) {
  //   const inputElement = event.target as HTMLInputElement; // ✅ Type assertion
  //   this.email = inputElement.value;
  //   this.onKeyUp();
  // }
  onKeyUp() // (keyup.enter) ="updateEmail($event)"
  {
    //console.log("Enter key pressed! Current email:",this.email);
    alert("Enter key pressed! Current email:"+this.email);
  }


}
