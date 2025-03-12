import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup ,FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {





  title : string = "Training";
  // // courses : string[] = ["Deutsch", "Spanisch" , "Englisch"];
  // // //courses :string[] = [];
  // // doWeHaveAnyCourses() : boolean
  // // {
  // //   if(this.courses.length > 0 )
  // //   {
  // //     return true;
  // //   }

  // //   return false;


  // //}
  // courses : {id:number,name:string}[] = [{id:1 , name:'Deutsch'}, {id:2,name:'Spanisch'} , {id:3,name:'Englisch'}];
  // status:string = '';
  // changeStatus()
  // {
  //   if(this.status === 'active' || this.status === '')
  //   {
  //     this.status = 'inactive';
  //   }

  //   else if(this.status === 'inactive' || this.status === '' )
  //   {
  //     this.status = 'active';
  //   }
  // }
  // isLoggedIn : boolean = false;
  // viewModeCase = 'map';
  // isRed = true;
  // isDisabled:boolean = false ;
  // toggleDisabled()
  // {
  //   this.isDisabled = !this.isDisabled;  // Toggle true or False
  // }

  // // bgColor: string = 'lightgray';
  // // fontSize: number = 16;

  // // increaseSize() {
  // //   this.fontSize += 2;
  // // }

  // // toggleBackground() {
  // //   this.bgColor = this.bgColor === 'lightgray' ? 'yellow' : 'lightgray';
  // // }

  // onAdd()
  // {
  //   this.courses.push({id:4, name:"Italienisch"});
  // }

  // onRemove(course:{id:number,name:string})
  // {
  //   //let index = this.courses.indexOf(course);
  //   var index :number = this.courses.findIndex(c => c.id === course.id);
  //   this.courses.splice(index,1)
  // }






}
