import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { FormsComponent } from './duplicate-form/forms.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
// import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    LoginFormComponent,
    FormArrayComponent,
    FormsComponent,
    ProfileFormComponent,
    DynamicFormComponent,
    // ReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})export class AppModule { }
