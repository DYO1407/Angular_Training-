import { Component } from '@angular/core';

export class CourseModel
{
  id: number;
  name: string;

  // constructor(id: number = 0, name: string = '') {
  //   this.id = id;
  //   this.name = name;
  // }

  constructor(course:CourseModel){
    this.id = course.id;
    this.name = course.name;
  }

}




@Component({
  selector: 'courses',
  templateUrl: "./courses.component.html",
  styleUrl: './courses.component.css',
})
export class CoursesComponent {

  email: string = "me@example.com";

  courseName: string ="";
  courses : CourseModel[] = [
    { id: 1, name: 'Deutsch' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Arabic ' },
  ];  // Array of objects with id and name properties

  addCourse()

    {
      let course = new CourseModel({ id: this.courses.length + 1, name: this.courseName });
      this.courses.push(course);
      this.courseName = "";

    }

    // ############# duplicate with an index as a parameter ##############

    // duplicateCourse(index: number)
    // {
    //   let course = new CourseModel( this.courses.length +1, this.courses[index].name);
    //   this.courses.splice(index+1,0,course);
    // }

    // ######### duplicate with a course object as a parameter #############
    // duplicateCourse(course: CourseModel) // but there is a problem with id of the duplicated course
    // {
    //   let duplicatedCourse = new CourseModel(course);
    //   let index : number  = this.courses.findIndex(c => c.id === course.id);
    //   course.id = this.courses.length + 1;
    //   this.courses.splice(index,0,duplicatedCourse);

    // }


    //dupicate with a course object as a parameter and index as a parameter

    duplicateCourse(course: CourseModel, index: number)
    {
      let duplicatedCourse = new CourseModel(course);
      duplicatedCourse.id = this.courses.length + 1;
      this.courses.splice(index+1,0,duplicatedCourse);
    }


 get allCourses() {
    return this.courses;
  }

  onSubmit()
  {
    console.log(this.courses);

  }


    // updateEmail(event: Event) {
    //   const inputElement = event.target as HTMLInputElement; // ✅ Type assertion
    //   this.email = inputElement.value;
    //   this.onKeyUp();
    // }
    onKeyUp() // (keyup.enter) ="updateEmail($event)"
    {
      //console.log("Enter key pressed! Current email:",this.email);
      alert("Enter key pressed! Current email:" + this.email);
    }


  }


