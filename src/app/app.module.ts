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
import { SimpleDynamicFormsComponent } from './simple-dynamic-forms/simple-dynamic-forms.component';
import { DynamicFormGroupComponent } from './shared/dynamic-form-group/dynamic-form-group.component';
import { DynamicFormHostComponent } from './pages/dynamic-form-host/dynamic-form-host.component';
import { PropertyComponent } from './property/property.component';
import { ShareComponent } from './share/share.component';
import { MortgageComponent } from './mortgage/mortgage.component';
import { CheckboxComponent } from './shared/check-box/check-box.component';
import { SelectallCheckboxComponent } from './selectall-checkbox/selectall-checkbox.component';
import { ProfileformComponent } from './profileform/profileform.component';

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
    SimpleDynamicFormsComponent,
    DynamicFormGroupComponent,
    DynamicFormHostComponent,
    PropertyComponent,
    ShareComponent,
    MortgageComponent,
    CheckboxComponent,
    SelectallCheckboxComponent,
    ProfileformComponent,

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
